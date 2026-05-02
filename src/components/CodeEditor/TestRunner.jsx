import { FaCheck, FaTimes } from 'react-icons/fa';
import './TestRunner.css';

const TestRunner = ({ results, runtime, isRunning }) => {
  if (isRunning) {
    return (
      <div className="test-runner">
        <div className="test-runner-running">
          <span className="spinner" />
          <span>Running tests...</span>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="test-runner">
        <p className="test-runner-empty">Click Run to execute tests</p>
      </div>
    );
  }

  const allPassed = results.every((r) => r.passed);

  return (
    <div className="test-runner">
      <div className="test-runner-header">
        <div className={`test-overall-status ${allPassed ? 'pass' : 'fail'}`}>
          {allPassed ? (
            <>
              <FaCheck />
              <span>All Tests Passed</span>
            </>
          ) : (
            <>
              <FaTimes />
              <span>Some Tests Failed</span>
            </>
          )}
        </div>
        {runtime !== undefined && <span className="test-runtime">{runtime}ms</span>}
      </div>

      <div className="test-results">
        {results.map((result, idx) => (
          <div
            key={idx}
            className={`test-result-item ${result.passed ? 'pass' : 'fail'}`}
          >
            <div className="test-result-top">
              <span className="test-case-number">Case {idx + 1}</span>
              <span className="test-result-icon">
                {result.passed ? <FaCheck /> : <FaTimes />}
              </span>
            </div>
            <div className="test-details">
              <div className="test-detail-row">
                <span className="test-detail-label">Input:</span>
                <code className="test-detail-value">{JSON.stringify(result.input)}</code>
              </div>
              <div className="test-detail-row">
                <span className="test-detail-label">Expected:</span>
                <code className="test-detail-value">{JSON.stringify(result.expected)}</code>
              </div>
              <div className="test-detail-row">
                <span className="test-detail-label">Actual:</span>
                <code className="test-detail-value">{JSON.stringify(result.actual)}</code>
              </div>
              {result.error && (
                <div className="test-detail-row error">
                  <span className="test-detail-label">Error:</span>
                  <code className="test-detail-value">{result.error}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestRunner;
