import { useState, useEffect, useCallback } from 'react';
import { FaCheckCircle, FaTimesCircle, FaLightbulb, FaRedo, FaTrophy } from 'react-icons/fa';
import './QuizSection.css';

/**
 * QuizSection - Beautiful quiz widget for topic detail pages
 * @param {Array} questions - Array of {q, options, correct, explanation}
 * @param {string} topicName - Name of the topic for display
 */
export const QuizSection = ({ questions, topicName }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffled, setShuffled] = useState([]);

  // Shuffle questions on mount
  useEffect(() => {
    if (questions && questions.length > 0) {
      const shuffledQs = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
      setShuffled(shuffledQs);
    }
  }, [questions]);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === shuffled[currentQ].correct;
    setAnswers(prev => [...prev, isCorrect]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQ < shuffled.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = useCallback(() => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setShowExplanation(false);
    const newShuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffled(newShuffled);
  }, [questions]);

  const score = answers.filter(Boolean).length;
  const percentage = Math.round((score / shuffled.length) * 100) || 0;

  if (!shuffled.length) return null;

  return (
    <div className="quiz-section">
      <div className="quiz-header">
        <FaTrophy className="quiz-trophy" />
        <h3>Test Your Knowledge — {topicName}</h3>
        <p>{shuffled.length} quick questions to challenge your understanding</p>
      </div>

      {!showResult ? (
        <div className="quiz-card">
          <div className="quiz-progress">
            <div className="quiz-progress-bar" style={{ width: `${((currentQ) / shuffled.length) * 100}%` }} />
            <span className="quiz-progress-text">{currentQ + 1} / {shuffled.length}</span>
          </div>

          <div className="quiz-question">
            <span className="quiz-q-num">Q{currentQ + 1}</span>
            <p>{shuffled[currentQ].q}</p>
          </div>

          <div className="quiz-options">
            {shuffled[currentQ].options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = idx === shuffled[currentQ].correct;
              const showCorrect = selected !== null && isCorrect;
              const showWrong = selected !== null && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  className={`quiz-option ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                >
                  <span className="quiz-opt-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="quiz-opt-text">{opt}</span>
                  {showCorrect && <FaCheckCircle className="quiz-icon" />}
                  {showWrong && <FaTimesCircle className="quiz-icon" />}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="quiz-explanation">
              <FaLightbulb className="quiz-bulb" />
              <div>
                <strong>{selected === shuffled[currentQ].correct ? 'Correct! ' : 'Not quite. '}</strong>
                {shuffled[currentQ].explanation}
              </div>
            </div>
          )}

          {selected !== null && (
            <button className="quiz-next-btn" onClick={handleNext}>
              {currentQ < shuffled.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-result-card">
          <div className={`quiz-score-circle ${percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : 'needs-work'}`}>
            <span className="quiz-score-num">{percentage}%</span>
            <span className="quiz-score-label">{score}/{shuffled.length} correct</span>
          </div>
          <div className="quiz-feedback">
            {percentage >= 80 && <><span className="quiz-emoji">🎉</span> Outstanding! You've mastered this topic!</>}
            {percentage >= 60 && percentage < 80 && <><span className="quiz-emoji">👍</span> Good job! Keep practicing to reach mastery.</>}
            {percentage < 60 && <><span className="quiz-emoji">📚</span> Keep studying! Review the concepts and try again.</>}
          </div>
          <button className="quiz-retry-btn" onClick={handleRetry}>
            <FaRedo /> Try Again
          </button>
        </div>
      )}
    </div>
  );
};
