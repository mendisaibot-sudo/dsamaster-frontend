import { useState } from 'react';
import { FaCheckCircle, FaBookOpen } from 'react-icons/fa';
import './Learn.css';

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
                  {block.type === 'text' && <p>{block.content}</p>}
                  {block.type === 'heading' && <h2>{block.content}</h2>}
                  {block.type === 'code' && (
                    <div className="code-example">
                      <div className="code-header">
                        <span className="code-lang">{block.language || 'code'}</span>
                      </div>
                      <pre><code>{block.content}</code></pre>
                    </div>
                  )}
                  {block.type === 'list' && Array.isArray(block.content) && (
                    <ul>
                      {block.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {block.type === 'tip' && (
                    <div className="tip-box">
                      <strong>💡 Tip:</strong> <span>{block.content}</span>
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
                <section key={section}>
                  <h3>{section}</h3>
                  <p>{content}</p>
                </section>
              ))}
            </>
          )
        )}
        {data.code_examples?.map(ex => (
          <div key={ex.id} className="code-example">
            <div className="code-header">
              <span className="code-lang">{ex.language}</span>
            </div>
            <pre><code>{ex.code}</code></pre>
            {ex.output && (
              <div className="code-output">
                <strong>Output:</strong>
                <pre>{ex.output}</pre>
              </div>
            )}
          </div>
        ))}
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
