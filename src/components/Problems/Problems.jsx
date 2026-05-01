import { useState } from 'react';
import { problems } from '../../data/problems';
import { useProgress } from '../../contexts/ProgressContext';
import { FaCheck, FaCircle, FaCode } from 'react-icons/fa';
import './Problems.css';

const Problems = () => {
  const [activeTab, setActiveTab] = useState('easy');
  const { addSolvedProblem, addActivity } = useProgress();
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleToggleSolved = (problem) => {
    const newSolved = new Set(solvedProblems);
    if (newSolved.has(problem.id)) {
      newSolved.delete(problem.id);
    } else {
      newSolved.add(problem.id);
      addSolvedProblem(problem.id);
    }
    setSolvedProblems(newSolved);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6366f1';
    }
  };

  const currentProblems = problems[activeTab] || [];

  return (
    <section id="problems" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Practice Problems</h2>
          <p>Apply your knowledge with curated problems from easy to hard</p>
        </div>

        <div className="problems-tabs">
          <button
            className={activeTab === 'easy' ? 'active' : ''}
            onClick={() => setActiveTab('easy')}
            style={{ '--tab-color': '#22c55e' }}
          >
            Easy <span className="count">{problems.easy.length}</span>
          </button>
          <button
            className={activeTab === 'medium' ? 'active' : ''}
            onClick={() => setActiveTab('medium')}
            style={{ '--tab-color': '#f59e0b' }}
          >
            Medium <span className="count">{problems.medium.length}</span>
          </button>
          <button
            className={activeTab === 'hard' ? 'active' : ''}
            onClick={() => setActiveTab('hard')}
            style={{ '--tab-color': '#ef4444' }}
          >
            Hard <span className="count">{problems.hard.length}</span>
          </button>
        </div>

        <div className="problems-list">
          {currentProblems.map((problem) => (
            <div
              key={problem.id}
              className={`problem-card ${solvedProblems.has(problem.id) ? 'solved' : ''}`}
              onClick={() => setSelectedProblem(problem)}
            >
              <div className="problem-status">
                {solvedProblems.has(problem.id) ? (
                  <FaCheck className="check-icon" />
                ) : (
                  <FaCircle className="circle-icon" />
                )}
              </div>
              <div className="problem-info">
                <h4>{problem.title}</h4>
                <span className="category">{problem.category}</span>
              </div>
              <span
                className="difficulty-badge-problems"
                style={{ background: getDifficultyColor(problem.difficulty) + '20', color: getDifficultyColor(problem.difficulty) }}
              >
                {problem.difficulty}
              </span>
            </div>
          ))}
        </div>

        {selectedProblem && (
          <div className="modal-overlay" onClick={() => setSelectedProblem(null)}>
            <div className="modal-content problem-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2>{selectedProblem.title}</h2>
                  <span className="category-tag">{selectedProblem.category}</span>
                </div>
                <button className="modal-close" onClick={() => setSelectedProblem(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="problem-detail">
                  <p className="problem-description">
                    Solve this {selectedProblem.difficulty} level problem related to {selectedProblem.category}.
                    Click the button below to mark it as solved and track your progress.
                  </p>
                  
                  <div className="suggested-approach">
                    <h4>Suggested Approach</h4>
                    <ul>
                      <li>Read the problem carefully</li>
                      <li>Identify the data structure needed</li>
                      <li>Consider edge cases</li>
                      <li>Optimize for time and space complexity</li>
                    </ul>
                  </div>

                  <button
                    className={`btn ${solvedProblems.has(selectedProblem.id) ? 'btn-secondary' : 'btn-success'}`}
                    onClick={() => handleToggleSolved(selectedProblem)}
                  >
                    <FaCode /> {solvedProblems.has(selectedProblem.id) ? 'Mark Unsolved' : 'Mark as Solved'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Problems;
