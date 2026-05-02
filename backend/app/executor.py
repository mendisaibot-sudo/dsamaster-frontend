"""
Docker-sandboxed code execution for DSAMaster.
Supports Python, Java, C++ with resource limits.
"""

import asyncio
import json
import os
import shutil
import tempfile
import uuid
from pathlib import Path
from typing import Any, Dict, List, Optional

import docker
from docker.errors import DockerException

# Docker client
try:
    docker_client = docker.from_env()
except DockerException:
    docker_client = None

# Configuration
IMAGE_NAME = os.getenv("EXECUTOR_IMAGE", "dsamaster-executor:latest")
TIMEOUT_SECONDS = int(os.getenv("EXECUTOR_TIMEOUT", "10"))
MEMORY_LIMIT = os.getenv("EXECUTOR_MEMORY", "128m")
CPU_LIMIT = os.getenv("EXECUTOR_CPU", "1.0")


def sanitize_code(code: str, language: str) -> str:
    """Check for dangerous patterns in code."""
    dangerous = [
        # Python
        r"import\s+os\b",
        r"import\s+subprocess",
        r"import\s+sys",
        r"__import__",
        r"os\.",
        r"subprocess\.",
        # Java
        r"Runtime\.getRuntime",
        r"ProcessBuilder",
        r"System\.exit",
        # C++
        r"system\s*\(",
        r"popen\s*\(",
        r"exec\s*\(",
        # Common
        r"fork\s*\(",
        r"while\s*\(\s*true\s*\)",
        r"while\s+True\b",
    ]
    
    import re
    for pattern in dangerous:
        if re.search(pattern, code, re.IGNORECASE):
            raise ValueError(f"Security violation: dangerous pattern '{pattern}' detected")
    
    return code


def generate_wrapper(code: str, language: str, function_name: str, test_input: Any) -> str:
    """Generate executable wrapper code that calls the user's function."""
    serialized = json.dumps(test_input)
    
    if language == "python":
        return f"""{code}

import json

if __name__ == "__main__":
    test_input = json.loads('{serialized}')
    if isinstance(test_input, list):
        result = {function_name}(*test_input)
    else:
        result = {function_name}(test_input)
    print(json.dumps(result, separators=(',', ':')))
"""
    
    elif language == "java":
        return f"""import java.util.*;
import com.google.gson.*;

{code}

public class Main {{
    public static void main(String[] args) {{
        Gson gson = new Gson();
        String inputJson = "{serialized.replace('"', '\\"')}";
        // Parse input
        Object input = gson.fromJson(inputJson, Object.class);
        // Call solution
        try {{
            Object result;
            if (input instanceof List) {{
                List<?> list = (List<?>) input;
                // Simplified: call with first element for single-arg
                if (list.size() == 1) {{
                    result = Solution.{function_name}(list.get(0));
                }} else if (list.size() == 2) {{
                    result = Solution.{function_name}(list.get(0), list.get(1));
                }} else {{
                    result = Solution.{function_name}(list.toArray());
                }}
            }} else {{
                result = Solution.{function_name}(input);
            }}
            System.out.println(gson.toJson(result));
        }} catch (Exception e) {{
            System.out.println("ERROR: " + e.getMessage());
        }}
    }}
}}
"""
    
    elif language == "cpp":
        return f"""{code}

#include <bits/stdc++.h>
using namespace std;

int main() {{
    // Read JSON input
    string inputJson = R"({serialized})";
    
    // Parse (simplified - would need proper JSON lib)
    try {{
        auto result = {function_name}();
        cout << result << endl;
    }} catch (exception& e) {{
        cout << "ERROR: " << e.what() << endl;
    }}
    return 0;
}}
"""
    
    else:
        raise ValueError(f"Unsupported language: {language}")


async def execute_in_sandbox(
    code: str,
    language: str,
    function_name: str,
    test_input: Any
) -> Dict[str, Any]:
    """Execute code in a Docker sandbox with resource limits."""
    
    if not docker_client:
        raise RuntimeError("Docker is not available")
    
    # Create temp directory
    temp_dir = Path(tempfile.mkdtemp(prefix="dsa-exec-"))
    
    try:
        # Generate wrapped code
        wrapped_code = generate_wrapper(code, language, function_name, test_input)
        
        # Determine file names
        if language == "python":
            code_file = "solution.py"
        elif language == "java":
            code_file = "Main.java"
        elif language == "cpp":
            code_file = "solution.cpp"
        else:
            raise ValueError(f"Unsupported language: {language}")
        
        # Write files
        code_path = temp_dir / code_file
        code_path.write_text(wrapped_code, encoding="utf-8")
        
        input_path = temp_dir / "input.txt"
        input_path.write_text(json.dumps(test_input), encoding="utf-8")
        
        # Build Docker command
        docker_cmd = [
            "docker", "run",
            "--rm",
            "--read-only",
            "--network=none",
            f"--memory={MEMORY_LIMIT}",
            f"--memory-swap={MEMORY_LIMIT}",
            f"--cpus={CPU_LIMIT}",
            "--pids-limit=50",
            "--security-opt=no-new-privileges:true",
            "-v", f"{temp_dir}:/sandbox:ro",
            IMAGE_NAME,
            "/executors/run.sh",
            language,
            f"/sandbox/{code_file}",
            "/sandbox/input.txt"
        ]
        
        # Run container
        start_time = asyncio.get_event_loop().time()
        
        process = await asyncio.create_subprocess_exec(
            *docker_cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        
        try:
            stdout, stderr = await asyncio.wait_for(
                process.communicate(),
                timeout=TIMEOUT_SECONDS
            )
            timed_out = False
        except asyncio.TimeoutError:
            process.kill()
            stdout, stderr = b"", b"TIMEOUT"
            timed_out = True
        
        execution_time = int((asyncio.get_event_loop().time() - start_time) * 1000)
        
        stdout_str = stdout.decode("utf-8", errors="replace").strip()
        stderr_str = stderr.decode("utf-8", errors="replace").strip()
        
        # Parse result
        result = None
        parse_error = None
        error = None
        
        if timed_out:
            error = "Execution timed out"
        elif stderr_str and "ERROR" in stderr_str:
            error = stderr_str
        elif stdout_str.startswith("ERROR:"):
            error = stdout_str
        elif stdout_str:
            try:
                result = json.loads(stdout_str)
            except json.JSONDecodeError as e:
                parse_error = f"Failed to parse output: {stdout_str}"
        
        return {
            "stdout": stdout_str,
            "stderr": stderr_str,
            "result": result,
            "parse_error": parse_error,
            "error": error,
            "execution_time_ms": execution_time,
            "timed_out": timed_out,
        }
        
    finally:
        # Cleanup
        shutil.rmtree(temp_dir, ignore_errors=True)
