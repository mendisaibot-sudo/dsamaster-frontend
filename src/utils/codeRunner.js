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

export async function runTests(userCode, testCases, functionName, timeoutMs = 2000, language = 'javascript') {
  // For now, only JavaScript can run in the browser
  if (language !== 'javascript') {
    const results = testCases.map((tc) => ({
      input: tc.input,
      expected: deepClone(tc.expected),
      actual: null,
      passed: false,
      language,
      error: `Code execution for ${language} is coming soon. The code editor supports syntax highlighting for ${language}, but running tests is currently only available for JavaScript.`
    }));
    return { results, allPassed: false };
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
