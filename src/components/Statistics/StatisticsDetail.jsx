import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { statisticsTopics } from '../../data/statistics';
import { useProgress } from '../../contexts/ProgressContext';
import './Statistics.css';

const StatisticsDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeExample, setActiveExample] = useState(0);
  const { addTopic } = useProgress();

  useEffect(() => {
    const found = statisticsTopics.find(t => t.id === topicId);
    if (found) {
      setTopic(found);
      addTopic(found.name);
    }
  }, [topicId, addTopic]);

  if (!topic) return (
    <div className="detail-page">
      <div className="container">
        <h2>Topic not found</h2>
        <button className="back-btn" onClick={() => navigate('/statistics')}>← Back</button>
      </div>
    </div>
  );

  return (
    <div className="detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/statistics')}>← Back to Statistics</button>

        <div className="detail-header" style={{ borderLeft: `4px solid transparent`, borderImageSlice: 1, borderImageSource: topic.color }}>
          <h1>{topic.name}</h1>
          <p className="detail-desc">{topic.details}</p>
          <div className="detail-tags">
            <span className="tag">Statistics</span>
            <span className="tag">{topic.category}</span>
          </div>
        </div>

        <div className="detail-tabs">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={activeTab === 'formulas' ? 'active' : ''} onClick={() => setActiveTab('formulas')}>Formulas</button>
          <button className={activeTab === 'examples' ? 'active' : ''} onClick={() => setActiveTab('examples')}>Examples</button>
          <button className={activeTab === 'applications' ? 'active' : ''} onClick={() => setActiveTab('applications')}>Real World</button>
        </div>

        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="stat-visual" style={{ background: topic.color.replace('135deg', '160deg'), padding: '2rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <h3>Key Concepts</h3>
              <div className="concepts-grid">
                {topic.concepts.map((c, i) => (
                  <span key={i} className="concept-pill">{c}</span>
                ))}
              </div>
            </div>
            <div className="stat-info-cards">
              <div className="info-card">
                <h4>What is it?</h4>
                <p>{topic.description}</p>
              </div>
              <div className="info-card">
                <h4>Why it matters</h4>
                <p>{topic.details}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formulas' && (
          <div className="tab-content">
            <h3>Essential Formulas</h3>
            <div className="formulas-grid">
              {topic.formulas.map((f, i) => (
                <div key={i} className="formula-card">
                  <div className="formula-name">{f.name}</div>
                  <div className="formula-code">{f.code}</div>
                  <div className="formula-text">{f.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="tab-content">
            <div className="example-selector">
              {topic.examples.map((ex, i) => (
                <button
                  key={i}
                  className={activeExample === i ? 'active' : ''}
                  onClick={() => setActiveExample(i)}
                >
                  {ex.title}
                </button>
              ))}
            </div>
            {topic.examples[activeExample] && (
              <div className="example-card">
                <h4>{topic.examples[activeExample].title}</h4>
                <div className="example-steps">
                  {topic.examples[activeExample].steps.map((step, i) => (
                    <div key={i} className="step">
                      <span className="step-num">{i + 1}</span>
                      <span className="step-text">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="example-result">
                  <strong>Result:</strong> {topic.examples[activeExample].result}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="tab-content">
            <h3>Real-World Applications</h3>
            <div className="applications-grid">
              {topic.applications.map((app, i) => (
                <div key={i} className="app-card">
                  <span className="app-num">{i + 1}</span>
                  <span className="app-text">{app}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsDetail;
