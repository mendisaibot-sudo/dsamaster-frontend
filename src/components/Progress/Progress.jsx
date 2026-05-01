import { useProgress } from '../../contexts/ProgressContext';
import { FaTrophy, FaBook, FaCode, FaFire, FaClock } from 'react-icons/fa';
import './Progress.css';

const Progress = () => {
  const { topicsCount, problemsCount, totalTopics, totalProblems, resetProgress, progress } = useProgress();

  const topicPercentage = Math.round((topicsCount / totalTopics) * 100);
  const problemPercentage = Math.round((problemsCount / totalProblems) * 100);

  const getStreakMessage = (streak) => {
    if (streak === 0) return 'Start learning to build your streak!';
    if (streak < 3) return 'Keep going!';
    if (streak < 7) return 'Great momentum!';
    return 'On fire! Keep it up!';
  };

  return (
    <section id="progress" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Your Progress</h2>
          <p>Track your learning journey and stay motivated</p>
        </div>

        <div className="progress-stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
              <FaBook />
            </div>
            <div className="stat-info">
              <h3>{topicsCount}</h3>
              <p>Topics Explored</p>
            </div>
            <div className="stat-bar">
              <div className="progress-fill" style={{ width: `${topicPercentage}%` }} />
            </div>
            <span className="stat-percentage">{topicPercentage}%</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.2)' }}>
              <FaCode />
            </div>
            <div className="stat-info">
              <h3>{problemsCount}</h3>
              <p>Problems Solved</p>
            </div>
            <div className="stat-bar">
              <div className="progress-fill" style={{ width: `${problemPercentage}%` }} />
            </div>
            <span className="stat-percentage">{problemPercentage}%</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
              <FaFire />
            </div>
            <div className="stat-info">
              <h3>{progress.streak}</h3>
              <p>Day Streak</p>
            </div>
            <p className="streak-message">{getStreakMessage(progress.streak)}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
              <FaTrophy />
            </div>
            <div className="stat-info">
              <h3>{Math.round((topicPercentage + problemPercentage) / 2)}%</h3>
              <p>Overall Progress</p>
            </div>
          </div>
        </div>

        {progress.activities.length > 0 && (
          <div className="recent-activity">
            <h3><FaClock /> Recent Activity</h3>
            <ul>
              {progress.activities.slice(0, 8).map((activity, index) => (
                <li key={index}>
                  <span className="activity-desc">{activity.description}</span>
                  <span className="activity-time">
                    {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="progress-actions">
          <button className="btn btn-secondary" onClick={resetProgress}>
            Reset Progress
          </button>
        </div>
      </div>
    </section>
  );
};

export default Progress;
