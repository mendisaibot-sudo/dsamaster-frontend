import { useState, useCallback } from 'react';
import { FaTrophy, FaTimes, FaCheckCircle, FaRedo, FaRocket } from 'react-icons/fa';
import './RandomTestModal.css';

/**
 * RandomTestModal - Generates a random 5-question test from all topics
 * @param {boolean} isOpen - Whether modal is visible
 * @param {Function} onClose - Close handler
 * @param {Object} allQuestions - Object mapping topicId → questions array
 * @param {string} title - e.g. "Statistics" or "Machine Learning"
 */
export const RandomTestModal = ({ isOpen, onClose, allQuestions, title }) => {
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  const generateTest = useCallback(() => {
    // Collect all questions across all topics
    const allQs = [];
    Object.entries(allQuestions).forEach(([topicId, questions]) => {
      questions.forEach(q => {
        allQs.push({ ...q, topicId });
      });
    });
    
    // Shuffle and pick 5
    const shuffled = allQs.sort(() => Math.random() - 0.5).slice(0, 5);
    setTestQuestions(shuffled);
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setStarted(true);
  }, [allQuestions]);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === testQuestions[currentQ].correct;
    setAnswers(prev => [...prev, isCorrect]);
    
    // Auto-advance after 1.5s
    setTimeout(() => {
      if (currentQ < testQuestions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRetry = () => {
    generateTest();
  };

  const score = answers.filter(Boolean).length;
  const percentage = Math.round((score / testQuestions.length) * 100) || 0;

  if (!isOpen) return null;

  return (
    <div className="test-modal-overlay" onClick={onClose}>
      <div className="test-modal-content" onClick={e => e.stopPropagation()}>
        <button className="test-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        {!started ? (
          <div className="test-intro">
            <FaRocket className="test-intro-icon" />
            <h2>{title} Quick Test</h2>
            <p>5 random questions to challenge your {title.toLowerCase()} knowledge!</p>
            <div className="test-stats">
              <span>5 Questions</span>
              <span>•</span>
              <span>No time limit</span>
              <span>•</span>
              <span>Instant feedback</span>
            </div>
            <button className="test-start-btn" onClick={generateTest}>
              Start Test
            </button>
          </div>
        ) : !showResult ? (
          <div className="test-active">
            <div className="test-progress-dots">
              {testQuestions.map((_, i) => (
                <span key={i} className={`dot ${i === currentQ ? 'active' : i < currentQ ? 'done' : ''}`} />
              ))}
            </div>

            <div className="test-question-box">
              <span className="test-q-badge">Q{currentQ + 1}/5</span>
              <h3>{testQuestions[currentQ].q}</h3>
            </div>

            <div className="test-options">
              {testQuestions[currentQ].options.map((opt, idx) => {
                const isCorrect = idx === testQuestions[currentQ].correct;
                const isSelected = selected === idx;
                const showState = selected !== null;

                return (
                  <button
                    key={idx}
                    className={`test-opt ${showState && isCorrect ? 'correct' : ''} ${showState && isSelected && !isCorrect ? 'wrong' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                  >
                    <span className="test-opt-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="test-opt-text">{opt}</span>
                    {showState && isCorrect && <FaCheckCircle />}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="test-explanation-mini">
                {selected === testQuestions[currentQ].correct ? (
                  <span className="test-correct-msg">✓ Correct! Well done.</span>
                ) : (
                  <span className="test-wrong-msg">✗ {testQuestions[currentQ].explanation}</span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="test-result">
            <FaTrophy className="test-trophy-icon" />
            <div className={`test-score-display ${percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : 'needs-work'}`}>
              <span className="test-score-percent">{percentage}%</span>
              <span className="test-score-fraction">{score}/5 correct</span>
            </div>
            <p className="test-feedback">
              {percentage === 100 && "🌟 Perfect score! You're a master!"}
              {percentage >= 80 && percentage < 100 && "🎉 Excellent work! Almost perfect!"}
              {percentage >= 60 && percentage < 80 && "👍 Good job! Room for improvement."}
              {percentage < 60 && "📚 Keep studying! You'll get there."}
            </p>
            <div className="test-actions">
              <button className="test-retry-btn" onClick={handleRetry}>
                <FaRedo /> Try Again
              </button>
              <button className="test-close-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
