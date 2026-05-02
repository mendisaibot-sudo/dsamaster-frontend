import { useState, useCallback } from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { runTests } from '../../utils/codeRunner';
import CodeEditor from '../CodeEditor/CodeEditor';
import TestRunner from '../CodeEditor/TestRunner';
import { FaPlay, FaCheck, FaArrowLeft } from 'react-icons/fa';
import './ProblemSolver.css';

const ProblemSolver = ({ problem, onClose }) => {
  const [code, setCode] = useState(problem.starterCode || '');
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runtime, setRuntime] = useState(undefined);
  const { addSolvedProblem, addActivity, progress } = useProgress();
  const [hasBeenSolved, setHasBeenSolved] = useState(false);

  const isAlreadySolved = progress.problemsSolved.includes(problem.id);

  const handleRun = useCallback(async () => {
    if (!problem.testCases || problem.testCases.length === 0) return;
    setIsRunning(true);
    setResults(null);
    setRuntime(undefined);

    const start = performance.now();
    const { results: res, allPassed } = await runTests(
      code,
      problem.testCases,
      problem.functionName,
      2000
    );
    const totalRuntime = Math.round(performance.now() - start);

    setResults(res);
    setRuntime(totalRuntime);
    setIsRunning(false);

    if (allPassed && !hasBeenSolved && !isAlreadySolved) {
      addSolvedProblem(problem.id);
      addActivity(`Solved problem ${problem.title} automatically`);
      setHasBeenSolved(true);
    }
  }, [code, problem, addSolvedProblem, addActivity, hasBeenSolved, isAlreadySolved]);

  const handleSolveManually = () => {
    if (!isAlreadySolved && !hasBeenSolved) {
      addSolvedProblem(problem.id);
      addActivity(`Marked ${problem.title} as solved manually`);
      setHasBeenSolved(true);
    }
  };

  return (
    <div className="problem-solver">
      <div className="problem-solver-header">
        <button className="btn-back" onClick={onClose}>
          <FaArrowLeft /> Back to List
        </button>
        <div className="problem-solver-title">
          <h2>{problem.title}</h2>
          <span
            className="difficulty-badge"
            data-difficulty={problem.difficulty}
          >
            {problem.difficulty}
          </span>
          <span className="category-tag">{problem.category}</span>
        </div>
        <div className="problem-solver-actions">
          <button
            className="btn-run"
            onClick={handleRun}
            disabled={isRunning || !problem.testCases?.length}
          >
            <FaPlay /> Run Tests
          </button>
          {(isAlreadySolved || hasBeenSolved) ? (
            <span className="solved-badge">
              <FaCheck /> Solved
            </span>
          ) : (
            <button className="btn-mark" onClick={handleSolveManually}>
              Mark as Solved
            </button>
          )}
        </div>
      </div>

      <div className="problem-solver-body">
        <div className="problem-pane">
          <div className="problem-description-scroll">
            <h3>Description</h3>
            <p className="problem-desc-text">
              {problem.description ||
                `Solve this ${problem.difficulty} level problem related to ${problem.category}.`}
            </p>

            {problem.examples && problem.examples.length > 0 && (
              <>
                <h4>Examples</h4>
                {problem.examples.map((ex, i) => (
                  <div className="example-block" key={i}>
                    <div className="example-line">
                      <strong>Input:</strong> {ex.input}
                    </div>
                    <div className="example-line">
                      <strong>Output:</strong> {ex.output}
                    </div>
                    {ex.explanation && (
                      <div className="example-line">
                        <strong>Explanation:</strong> {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {problem.constraints && problem.constraints.length > 0 && (
              <>
                <h4>Constraints</h4>
                <ul className="constraints-list">
                  {problem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="code-pane">
          <div className="editor-section">
            <div className="editor-toolbar">
              <span className="editor-label">
                JavaScript
              </span>
            </div>
            <div className="editor-wrapper">
              <CodeEditor code={code} onChange={setCode} />
            </div>
          </div>

          <div className="results-section">
            <TestRunner
              results={results}
              runtime={runtime}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
