"""
Docker-sandboxed code execution for DSAMaster.
Supports Python, Java, C++ with resource limits and security checks.
"""

import asyncio
import json
import os
import re
import shutil
import tempfile
from pathlib import Path
from typing import Any, Dict

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

# ---------------------------------------------------------------------------
# Security
# ---------------------------------------------------------------------------

BANNED_PYTHON_MODULES = {
    "os", "subprocess", "sys", "socket", "ctypes",
    "shutil", "urllib", "urllib2", "http", "ftplib", "telnetlib",
    "trace", "multiprocessing", "threading", "_thread", "concurrent",
    "importlib", "imp", "pathlib", "builtins", "__builtin__",
    "platform", "getpass", "tempfile", "pipes", "pty", "pickle",
    "marshal", "shelve", "dbm", "sqlite3", "commands", "popen2",
}


def _check_py_imports(code: str) -> None:
    for line in code.splitlines():
        stripped = line.strip()
        for m in BANNED_PYTHON_MODULES:
            if stripped.startswith(f"import {m}") or stripped.startswith(f"from {m} "):
                raise ValueError(f"Security violation: banned import '{m}' detected")


def sanitize_code(code: str, language: str) -> str:
    """Check for dangerous patterns in code."""
    dangerous = [
        r"__import__\s*\(",
        r"importlib\.import_module",
        r"compile\s*\(",
        r"exec\s*\(",
        r"eval\s*\(",
        r"Runtime\.getRuntime",
        r"ProcessBuilder",
        r"System\.exit",
        r"System\.exec",
        r"\bsystem\s*\(",
        r"\bpopen\s*\(",
        r"\bexec\s*\(",
        r"\bfork\s*\(",
        r"while\s*\(\s*1\s*\)",
        r"while\s*\(\s*true\s*\)",
        r"while\s+True\b",
        r"for\s+\(;\s*;\s*\)",
    ]
    for pattern in dangerous:
        if re.search(pattern, code, re.IGNORECASE):
            raise ValueError("Security violation: dangerous pattern detected")
    if language == "python":
        _check_py_imports(code)
    return code


# ---------------------------------------------------------------------------
# Wrapper Generation
# ---------------------------------------------------------------------------

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
        esc = serialized.replace('"', '\\"')
        return f"""import java.util.*;

{code}

public class Main {{
    private static String toJson(Object o) {{
        if (o == null) return "null";
        if (o instanceof String) return "\\"" + o + "\\"";
        if (o.getClass().isArray()) {{
            if (o instanceof int[])    return Arrays.toString((int[])o);
            if (o instanceof long[])   return Arrays.toString((long[])o);
            if (o instanceof double[]) return Arrays.toString((double[])o);
            if (o instanceof Object[]) return Arrays.deepToString((Object[])o);
        }}
        return o.toString();
    }}

    public static void main(String[] args) {{
        String inputJson = "{esc}";

        try {{
            int single = Integer.parseInt(inputJson.trim());
            System.out.println(toJson(Solution.{function_name}(single)));
            return;
        }} catch (Exception ignored) {{}}

        try {{
            if (inputJson.trim().startsWith("[[")) {{
                String inner = inputJson.trim();
                inner = inner.substring(1, inner.length() - 1).trim();
                List<int[]> list = new ArrayList<>();
                if (inner.length() > 0) {{
                    String[] parts = inner.split("\\],\\s*\\[");
                    for (String p : parts) {{
                        p = p.replace("[", "").replace("]", "").trim();
                        if (p.isEmpty()) continue;
                        String[] nums = p.split(",");
                        int[] arr = new int[nums.length];
                        for (int i = 0; i < nums.length; i++)
                            arr[i] = Integer.parseInt(nums[i].trim());
                        list.add(arr);
                    }}
                }}
                System.out.println(toJson(Solution.{function_name}(list.toArray(new int[0][]))));
                return;
            }}
        }} catch (Exception ignored) {{}}

        try {{
            if (inputJson.trim().startsWith("[") && !inputJson.trim().startsWith("[[")) {{
                String inner = inputJson.trim();
                inner = inner.substring(1, inner.length() - 1).trim();
                String[] nums = inner.split(",");
                int[] arr = new int[nums.length];
                for (int i = 0; i < nums.length; i++)
                    arr[i] = Integer.parseInt(nums[i].trim());
                System.out.println(toJson(Solution.{function_name}(arr)));
                return;
            }}
        }} catch (Exception ignored) {{}}

        try {{
            if (inputJson.trim().startsWith("[") && !inputJson.trim().startsWith("[[")) {{
                String trimmed = inputJson.trim();
                String inner = trimmed.substring(1, trimmed.length() - 1).trim();
                int bracketDepth = 0;
                int splitAt = -1;
                for (int i = inner.length() - 1; i >= 0; i--) {{
                    char c = inner.charAt(i);
                    if (c == ']') bracketDepth++;
                    else if (c == '[') bracketDepth--;
                    else if (c == ',' && bracketDepth == 0) {{
                        splitAt = i;
                        break;
                    }}
                }}
                if (splitAt > 0) {{
                    String first  = inner.substring(0, splitAt).trim();
                    String second = inner.substring(splitAt + 1).trim();
                    String fInner = first.substring(1, first.length() - 1).trim();
                    String[] nums = fInner.split(",");
                    int[] arr = new int[nums.length];
                    for (int i = 0; i < nums.length; i++)
                        arr[i] = Integer.parseInt(nums[i].trim());
                    int target = Integer.parseInt(second);
                    System.out.println(toJson(Solution.{function_name}(arr, target)));
                    return;
                }}
            }}
        }} catch (Exception ignored) {{}}

        System.out.println(toJson(Solution.{function_name}(inputJson.replace("\\"", ""))));
    }}
}}
"""

    elif language == "cpp":
        return f"""{code}

#include <bits/stdc++.h>
using namespace std;

int main() {{
    string inputJson = R"({serialized})";
    try {{
        int single = stoi(inputJson);
        auto result = {function_name}(single);
        cout << result << endl;
        return 0;
    }} catch (...) {{}}
    try {{
        if (inputJson.front() == '[' && inputJson.back() == ']' && inputJson.find("[[") == string::npos) {{
            string inner = inputJson.substr(1, inputJson.size()-2);
            vector<int> arr;
            stringstream ss(inner);
            string token;
            while (getline(ss, token, ',')) {{
                arr.push_back(stoi(token));
            }}
            auto result = {function_name}(arr);
            if constexpr (is_same<decltype(result), vector<int>>::value) {{
                cout << "[";
                for (size_t i = 0; i < result.size(); ++i) {{
                    if (i) cout << ",";
                    cout << result[i];
                }}
                cout << "]" << endl;
            }} else {{
                cout << result << endl;
            }}
            return 0;
        }}
    }} catch (...) {{}}
    cout << {function_name}() << endl;
    return 0;
}}
"""

    else:
        raise ValueError(f"Unsupported language: {language}")


# ---------------------------------------------------------------------------
# Execution
# ---------------------------------------------------------------------------

async def execute_in_sandbox(
    code: str,
    language: str,
    function_name: str,
    test_input: Any
) -> Dict[str, Any]:
    """Execute code in a Docker sandbox with resource limits."""

    if not docker_client:
        raise RuntimeError("Docker is not available")

    temp_dir = Path(tempfile.mkdtemp(prefix="dsa-exec-"))

    try:
        wrapped_code = generate_wrapper(code, language, function_name, test_input)

        if language == "python":
            code_file = "solution.py"
        elif language == "java":
            code_file = "Main.java"
        elif language == "cpp":
            code_file = "solution.cpp"
        else:
            raise ValueError(f"Unsupported language: {language}")

        code_path = temp_dir / code_file
        code_path.write_text(wrapped_code, encoding="utf-8")

        input_path = temp_dir / "input.txt"
        input_path.write_text(json.dumps(test_input), encoding="utf-8")

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

        execution_time = int(
            (asyncio.get_event_loop().time() - start_time) * 1000
        )

        stdout_str = stdout.decode("utf-8", errors="replace").strip()
        stderr_str = stderr.decode("utf-8", errors="replace").strip()

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
            except json.JSONDecodeError:
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
        shutil.rmtree(temp_dir, ignore_errors=True)
