import { useState } from 'react';
import { FaTimes, FaEye, FaBook, FaQuestionCircle } from 'react-icons/fa';
import ConceptVisualizer from './ConceptVisualizer';
import './ConceptModal.css';

/**
 * ConceptModal — Clickable concept explorer with explanation, visualisation, and per-concept quiz
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} concept — { name, explanation, visualType, visualData, quizQuestions[] }
 * @param {string} topicColor — gradient string for theming
 */
const ConceptModal = ({ isOpen, onClose, concept, topicColor }) => {
  const [activeTab, setActiveTab] = useState('explain');
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizShowExp, setQuizShowExp] = useState(false);
  const [quizScore, setQuizScore] = useState([]);
  const [quizDone, setQuizDone] = useState(false);

  if (!isOpen || !concept) return null;

  const questions = concept.quizQuestions || [];

  const handleAnswer = (idx) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    const correct = idx === questions[quizIdx]?.correct;
    setQuizScore(prev => [...prev, correct]);
    setQuizShowExp(true);
  };

  const handleNext = () => {
    if (quizIdx < questions.length - 1) {
      setQuizIdx(prev => prev + 1);
      setQuizSelected(null);
      setQuizShowExp(false);
    } else {
      setQuizDone(true);
    }
  };

  const handleRetry = () => {
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizShowExp(false);
    setQuizScore([]);
    setQuizDone(false);
  };

  const score = quizScore.filter(Boolean).length;
  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="concept-modal-overlay" onClick={onClose}>
      <div className="concept-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="cm-header" style={{ background: topicColor }}>
          <h3>{concept.name}</h3>
          <button className="cm-close" onClick={onClose}><FaTimes /></button>
        </div>

        {/* Tabs */}
        <div className="cm-tabs">
          <button className={activeTab === 'explain' ? 'active' : ''} onClick={() => setActiveTab('explain')}>
            <FaBook /> Explanation
          </button>
          <button className={activeTab === 'visual' ? 'active' : ''} onClick={() => setActiveTab('visual')}>
            <FaEye /> Visualise
          </button>
          <button className={activeTab === 'quiz' ? 'active' : ''} onClick={() => setActiveTab('quiz')}>
            <FaQuestionCircle /> Test ({questions.length})
          </button>
        </div>

        {/* Content */}
        <div className="cm-body">
          {activeTab === 'explain' && (
            <div className="cm-explain">
              <p>{concept.explanation || `Learn more about ${concept.name}.`}</p>
              {concept.formula && (
                <div className="cm-formula">
                  <code>{concept.formula}</code>
                </div>
              )}
            </div>
          )}

          {activeTab === 'visual' && (
            <ConceptVisualizer type={concept.visualType} data={concept.visualData} color={topicColor} />
          )}

          {activeTab === 'quiz' && (
            <div className="cm-quiz">
              {questions.length === 0 ? (
                <p className="cm-no-quiz">No questions available for this concept yet.</p>
              ) : quizDone ? (
                <div className="cm-result">
                  <div className="cm-result-score" style={{ color: percent >= 80 ? '#22c55e' : percent >= 50 ? '#f59e0b' : '#ef4444' }}>
                    {score} / {questions.length} correct ({percent}%)
                  </div>
                  <p>{percent >= 80 ? '🎉 Excellent! You mastered this concept.' : percent >= 50 ? '👍 Good effort! Review the explanation tab.' : '📚 Keep learning! Check the explanation tab.'}</p>
                  <button className="cm-retry-btn" onClick={handleRetry}>Try Again</button>
                </div>
              ) : (
                <>
                  <div className="cm-quiz-progress">Question {quizIdx + 1} of {questions.length}</div>
                  <div className="cm-quiz-q">{questions[quizIdx]?.q}</div>
                  <div className="cm-quiz-options">
                    {questions[quizIdx]?.options.map((opt, i) => (
                      <button
                        key={i}
                        className={`cm-option ${quizSelected !== null ? (i === questions[quizIdx].correct ? 'correct' : i === quizSelected ? 'wrong' : '') : ''}`}
                        onClick={() => handleAnswer(i)}
                        disabled={quizSelected !== null}
                      >
                        <span className="cm-opt-letter">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {quizShowExp && questions[quizIdx]?.explanation && (
                    <div className="cm-explanation">{questions[quizIdx].explanation}</div>
                  )}
                  {quizSelected !== null && (
                    <button className="cm-next-btn" onClick={handleNext}>
                      {quizIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptModal;
