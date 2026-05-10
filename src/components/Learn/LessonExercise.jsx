import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRedo } from 'react-icons/fa';
import './LessonExercise.css';

export default function LessonExercise({ exercises = [], lessonSlug, onSubmitExercise }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!exercises || exercises.length === 0) {
    return (
      <div className="lesson-exercise-empty animate-fade-in">
        <span className="empty-icon">📝</span>
        <p>No exercises for this lesson yet.</p>
      </div>
    );
  }

  if (showResults) {
    const correctCount = Object.values(answered).filter(a => a.correct).length;
    const total = exercises.length;
    const percentage = Math.round((correctCount / total) * 100);
    return (
      <div className="lesson-exercise-results animate-fade-in">
        <div className="results-card">
          <div className="results-icon">
            {percentage === 100 ? '🎉' : percentage >= 70 ? '👍' : '💪'}
          </div>
          <h3>Practice Complete!</h3>
          <div className="results-score">
            You got <strong>{correctCount}/{total}</strong> correct
          </div>
          <div className="results-bar">
            <div
              className="results-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="results-message">
            {percentage === 100
              ? 'Perfect score! Amazing work!'
              : percentage >= 70
              ? 'Great job! Keep practicing!'
              : 'Keep trying — you\'ll get there!'}
          </p>
          <button
            className="btn btn-secondary try-again-btn"
            onClick={() => {
              setAnswered({});
              setSelectedOption(null);
              setCurrentIndex(0);
              setShowResults(false);
            }}
          >
            <FaRedo /> Try Again
          </button>
        </div>
      </div>
    );
  }

  const current = exercises[currentIndex];
  const currentAnswer = answered[current.id ?? currentIndex];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === current.correctIndex;
    const answerKey = current.id ?? currentIndex;
    setAnswered(prev => ({
      ...prev,
      [answerKey]: { selected: selectedOption, correct }
    }));
    if (onSubmitExercise) {
      onSubmitExercise(lessonSlug, current.id ?? currentIndex, selectedOption);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const progressPercent = ((currentIndex) / exercises.length) * 100;

  return (
    <div className="lesson-exercise animate-fade-in">
      {/* Progress */}
      <div className="exercise-progress">
        <div className="exercise-progress-header">
          <span>Exercise {currentIndex + 1} of {exercises.length}</span>
          <span className="exercise-progress-pct">{Math.round(progressPercent)}% complete</span>
        </div>
        <div className="exercise-progress-bar">
          <div
            className="exercise-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="exercise-card-content">
        <div className="exercise-question">{current.question}</div>
        <div className="exercise-options">
          {(current.options || []).map((option, idx) => {
            const isAnswered = !!currentAnswer;
            const isSelected = selectedOption === idx;
            const isCorrect = idx === current.correctIndex;
            let optionClass = 'exercise-option';
            if (isAnswered) {
              if (isCorrect) optionClass += ' correct';
              else if (isSelected && !isCorrect) optionClass += ' incorrect';
            } else if (isSelected) {
              optionClass += ' selected';
            }
            return (
              <label key={idx} className={optionClass}>
                <input
                  type="radio"
                  name="exercise-option"
                  value={idx}
                  checked={isSelected}
                  onChange={() => !isAnswered && setSelectedOption(idx)}
                  disabled={isAnswered}
                />
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{option}</span>
                {isAnswered && isCorrect && (
                  <FaCheckCircle className="option-icon correct-icon" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <FaTimesCircle className="option-icon incorrect-icon" />
                )}
              </label>
            );
          })}
        </div>

        {/* Feedback */}
        {currentAnswer && (
          <div className={`exercise-feedback ${currentAnswer.correct ? 'correct' : 'incorrect'} animate-fade-in`}>
            <div className="feedback-header">
              {currentAnswer.correct ? (
                <><FaCheckCircle /> Correct!</>
              ) : (
                <><FaTimesCircle /> Incorrect</>
              )}
            </div>
            {current.explanation && (
              <div className="exercise-explanation">
                <strong>Explanation:</strong> {current.explanation}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="exercise-actions">
          {!currentAnswer ? (
            <button
              className="btn btn-primary submit-btn"
              onClick={handleSubmit}
              disabled={selectedOption === null}
            >
              Submit Answer
            </button>
          ) : (
            <button className="btn btn-primary next-btn" onClick={handleNext}>
              {currentIndex < exercises.length - 1 ? 'Next Exercise →' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
