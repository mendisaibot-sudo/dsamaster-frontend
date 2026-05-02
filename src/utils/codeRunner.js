function compareResult(actual, expected) {
  if (actual === expected) return true;
  if (Array.isArray(actual) && Array.isArray(expected)) {
    return JSON.stringify(actual) === JSON.stringify(expected);
  }
  if (typeof actual === 'object' && actual !== null && typeof expected === 'object' && expected !== null) {
    return JSON.stringify(actual) === JSON.stringify(expected);
  }
  if (typeof actual === 'number' && typeof expected === 'number' && isNaN(actual) && isNaN(expected)) return true;
  return false;
}

export function runTests(userCode, testCases, functionName, timeoutMs = 2000) {
  const results = [];
  
  try {
    // Create a wrapper that defines the function
    const fn = new Function(`${userCode}; return ${functionName};`)();
    
    if (typeof fn !== 'function') {
      throw new Error(`Function '${functionName}' not found. Make sure it's defined.`);
    }
    
    for (const tc of testCases) {
      const input = JSON.parse(JSON.stringify(tc.input)); // deep clone
      const expected = JSON.parse(JSON.stringify(tc.expected));
      
      try {
        const start = performance.now();
        const actual = Array.isArray(input) ? fn(...input) : fn(input);
        const runtime = Math.round(performance.now() - start);
        
        const passed = compareResult(actual, expected);
        results.push({ input, expected, actual, passed, runtime });
      } catch (err) {
        results.push({ input, expected, actual: err.message, passed: false, error: err.message });
      }
    }
  } catch (err) {
    results.push({ input: null, expected: null, actual: err.message, passed: false, error: err.message });
  }
  
  const allPassed = results.length > 0 && results.every(r => r.passed);
  return { results, allPassed };
}
