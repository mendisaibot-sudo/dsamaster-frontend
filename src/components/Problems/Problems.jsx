import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { problems } from '../../data/problems';
import { useProgress } from '../../contexts/ProgressContext';
import ProblemSolver from './ProblemSolver';
import SEO from '../SEO/SEO';
import { FaCheck, FaCircle } from 'react-icons/fa';
import './Problems.css';

const Problems = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const [activeTab, setActiveTab] = useState('easy');
  const { progress } = useProgress();

  const currentProblems = problems[activeTab] || [];
  
  const allProblems = [...problems.easy, ...problems.medium, ...problems.hard];
  
  const selectedProblem = problemId ? allProblems.find((p) => p.id === problemId) : null;

  const isSolved = (id) => progress.problemsSolved.includes(id);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6366f1';
    }
  };


  if (problemId && selectedProblem) {
    return (
      <>
        <SEO 
          title={`${selectedProblem.title} - ${selectedProblem.category} - DSA Master`}
          description={`Practice ${selectedProblem.title} - ${selectedProblem.difficulty} difficulty ${selectedProblem.category} problem with interactive code editor.`}
          keywords={`${selectedProblem.title.toLowerCase()}, ${selectedProblem.category.toLowerCase()}, coding interview, DSA`}
          path={`/problems/${selectedProblem.id}`}
        />
        <ProblemSolver
          problem={selectedProblem}
          onClose={() => navigate('/problems')}
        />
      </>
    );
  }

  return (
    <section id="problems" className="section section-alt">
      <SEO 
        title="Practice Problems - DSA Master"
        description="Practice 30+ Data Structures & Algorithms problems with interactive code editor. Includes Easy, Medium, and Hard difficulty levels."
        keywords="coding problems, leetcode, DSA practice, interview preparation"
        path="/problems"
      />
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
              className={`problem-card ${isSolved(problem.id) ? 'solved' : ''}`}
              onClick={() => navigate(`/problems/${problem.id}`)}
            >
              <div className="problem-status">
                {isSolved(problem.id) ? (
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
                style={{
                  background: getDifficultyColor(problem.difficulty) + '20',
                  color: getDifficultyColor(problem.difficulty)
                }}
              >
                {problem.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
