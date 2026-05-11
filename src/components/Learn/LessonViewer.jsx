import { useState } from 'react';
import { FaCheckCircle, FaBookOpen, FaPlay, FaLightbulb, FaTerminal } from 'react-icons/fa';
import './Learn.css';

function CodeExample({ language, code, output, explanation }) {
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(true);
    setHasRun(true);
    // Simulate execution delay
    setTimeout(() => setIsRunning(false), 800);
  };

  return (
    <div className="code-example-container">
      <div className="code-example-header">
        <span className="code-lang-badge">{language || 'code'}</span>
        <span className="code-example-title">{explanation || 'Code Example'}</span>
      </div>
      <div className="code-example">
        <pre><code>{code}</code></pre>
      </div>
      <div className="code-actions">
        <button
          className={`btn-run-code ${isRunning ? 'running' : ''}`}
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? (
            <><span className="spinner"></span> Running...</>
          ) : (
            <><FaPlay /> Run Code</>
          )}
        </button>
        {hasRun && !isRunning && (
          <span className="run-success"><FaCheckCircle /> Code executed successfully</span>
        )}
      </div>
      {showOutput && (
        <div className="code-output-container">
          <div className="code-output-header">
            <span><FaTerminal /> Output</span>
            {output && <span className="expected-tag">Expected Result</span>}
          </div>
          <pre className="code-output-content">{output || '✅ Code executed (no output to display)'}</pre>
        </div>
      )}
      {!showOutput && output && (
        <div className="output-hint">
          <FaLightbulb /> Click <strong>"Run Code"</strong> to see the expected output
        </div>
      )}
    </div>
  );
}

export default function LessonViewer({ lesson, onComplete, isCompleted }) {
  const [marking, setMarking] = useState(false);
  const data = lesson;

  const handleComplete = async () => {
    if (isCompleted || marking) return;
    setMarking(true);
    try {
      await onComplete?.();
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className="lesson-viewer animate-fade-in">
      <div className="lesson-body">
        {data.content && (
          typeof data.content === 'string' ? (
            <div className="lesson-text-content">
              <p>{data.content}</p>
            </div>
          ) : (
            <>
              {data.content.title && (
                <div className="lesson-header">
                  <h2>{data.content.title}</h2>
                </div>
              )}
              {Array.isArray(data.content.blocks) && data.content.blocks.map((block, idx) => (
                <div key={idx} className={`content-block block-${block.type}`}>
                  {(block.type === 'text' || block.type === 'paragraph') && (
                    <div className="lesson-paragraph">
                      <p>{block.content}</p>
                    </div>
                  )}
                  {block.type === 'heading' && <h3 className="lesson-heading">{block.content}</h3>}
                  {block.type === 'code' && (
                    <CodeExample
                      language={block.language}
                      code={block.content}
                      output={block.output}
                      explanation={block.explanation}
                    />
                  )}
                  {block.type === 'list' && Array.isArray(block.content) && (
                    <ul className="lesson-list">
                      {block.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {block.type === 'tip' && (
                    <div className="tip-box">
                      <FaLightbulb /> <strong>Tip:</strong> <span>{block.content}</span>
                    </div>
                  )}
                  {block.type === 'exercise' && (
                    <div className="exercise-box">
                      <h4>🎯 Exercise</h4>
                      <p>{block.content}</p>
                    </div>
                  )}
                </div>
              ))}
              {!data.content.blocks && Object.entries(data.content).map(([section, content]) => (
                <section key={section} className="lesson-section">
                  <h3>{section}</h3>
                  <p>{content}</p>
                </section>
              ))}
            </>
          )
        )}
        {data.code_examples && data.code_examples.length > 0 && (
          <div className="lesson-code-examples">
            <h3 className="section-title">💻 Code Examples</h3>
            {data.code_examples.map((ex, idx) => (
              <CodeExample
                key={ex.id ?? idx}
                language={ex.language}
                code={ex.code}
                output={ex.output}
                explanation={ex.description}
              />
            ))}
          </div>
        )}
      </div>

      {/* Complete Lesson Action */}
      <div className="lesson-actions">
        <div className="lesson-actions-spacer" />
        <button
          className={`btn btn-mark-complete ${isCompleted ? 'completed' : ''}`}
          onClick={handleComplete}
          disabled={isCompleted || marking}
        >
          {isCompleted ? (
            <><FaCheckCircle /> Completed</>
          ) : marking ? (
            'Marking...'
          ) : (
            <><FaBookOpen /> Complete Lesson</>
          )}
        </button>
      </div>
    </div>
  );
}
