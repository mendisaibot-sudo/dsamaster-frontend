// Backend API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function serializeInput(input) {
  if (input === undefined) return 'undefined';
  if (input === null) return 'null';
  if (typeof input === 'string') return `"${input.replace(/"/g, '\\"')}"`;
  if (typeof input === 'number' || typeof input === 'boolean') return String(input);
  if (Array.isArray(input)) {
    return `[${input.map(serializeInput).join(', ')}]`;
  }
  return JSON.stringify(input);
}

function deepClone(v) {
  if (v === null || typeof v !== 'object') return v;
  if (Array.isArray(v)) return v.map(deepClone);
  const out = {};
  for (const k of Object.keys(v)) out[k] = deepClone(v[k]);
  return out;
}

function compareResult(actual, expected) {
  if (actual === expected) return true;
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (!compareResult(actual[i], expected[i])) return false;
    }
    return true;
  }
  if (typeof actual === 'object' && actual !== null && typeof expected === 'object' && expected !== null) {
    return JSON.stringify(actual) === JSON.stringify(expected);
  }
  if (typeof actual === 'number' && typeof expected === 'number' && Number.isNaN(actual) && Number.isNaN(expected)) return true;
  return false;
}

export async function runTestsBackend(userCode, testCases, functionName, language) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        code: userCode,
        test_cases: testCases.map(tc => ({ input: tc.input, expected: tc.expected })),
        function_name: functionName || 'solution'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Backend execution failed');
    }

    const data = await response.json();
    
    // Transform backend response to match existing frontend format
    const results = data.results.map(r => ({
      input: r.input,
      expected: r.expected,
      actual: r.actual,
      passed: r.passed,
      runtime: r.execution_time_ms,
      error: r.error
    }));

    return {
      results,
      allPassed: data.all_passed
    };
  } catch (error) {
    // If backend is unavailable, show error
    const results = testCases.map((tc) => ({
      input: tc.input,
      expected: deepClone(tc.expected),
      actual: null,
      passed: false,
      error: `Backend error: ${error.message}. Make sure the server is running.`
    }));
    return { results, allPassed: false };
  }
}

export async function runTests(userCode, testCases, functionName, timeoutMs = 2000, language = 'javascript') {
  // For now, only JavaScript can run in the browser
  if (language !== 'javascript') {
    return runTestsBackend(userCode, testCases, functionName, language);
  }

  const results = [];
  const fnName = functionName || 'solution';

  for (const tc of testCases) {
    const input = deepClone(tc.input);
    const expected = deepClone(tc.expected);
    const argsSerialized = Array.isArray(input)
      ? input.map(serializeInput).join(', ')
      : serializeInput(input);

    try {
      const fn = new Function(
        `${userCode}\nreturn ${fnName}(${argsSerialized});`
      );

      const start = performance.now();
      const actual = await Promise.race([
        (async () => {
          const r = fn();
          return r instanceof Promise ? await r : r;
        })(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs)
        )
      ]);
      const runtime = Math.round(performance.now() - start);

      const passed = compareResult(actual, expected);
      results.push({ input: tc.input, expected, actual, passed, runtime });
    } catch (error) {
      results.push({
        input: tc.input,
        expected,
        actual: null,
        passed: false,
        error: error?.message || String(error)
      });
    }
  }

  const allPassed = results.length > 0 && results.every((r) => r.passed);
  return { results, allPassed };
}
