import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { statisticsTopics } from '../../data/statistics';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import ConceptModal from '../ConceptModal/ConceptModal';
import { useProgress } from '../../contexts/ProgressContext';
import './Statistics.css';

const StatisticsDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('concepts');
  const [activeExample, setActiveExample] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const { addTopic } = useProgress();

  useEffect(() => {
    const found = statisticsTopics.find(t => t.id === topicId);
    if (found) {
      setTopic(found);
      addTopic(found.name);
    }
  }, [topicId, addTopic]);

  const openConcept = (conceptName) => {
    const details = topic?.conceptDetails?.[conceptName] || { name: conceptName, explanation: `Learn more about ${conceptName}.` };
    setSelectedConcept(details);
    setModalOpen(true);
  };

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
          <button className={activeTab === 'concepts' ? 'active' : ''} onClick={() => setActiveTab('concepts')}>Key Concepts</button>
          <button className={activeTab === 'formulas' ? 'active' : ''} onClick={() => setActiveTab('formulas')}>Formulas</button>
          <button className={activeTab === 'code' ? 'active' : ''} onClick={() => setActiveTab('code')}>Code</button>
          <button className={activeTab === 'examples' ? 'active' : ''} onClick={() => setActiveTab('examples')}>Examples</button>
          <button className={activeTab === 'apps' ? 'active' : ''} onClick={() => setActiveTab('apps')}>Applications</button>
        </div>

        {activeTab === 'concepts' && (
          <div className="tab-content">
            <div className="topic-description">
              <h3>What is {topic.name}?</h3>
              <p>{topic.description}</p>
              <p className="detail-why">{topic.details}</p>
            </div>
            <h3 className="concepts-heading">Click any concept to explore:</h3>
            <div className="concepts-cards-grid">
              {topic.concepts.map((c, i) => (
                <div key={i} className="concept-card card-interactive" onClick={() => openConcept(c)}>
                  <div className="concept-card-icon" style={{ background: topic.color }}>
                    <span>{i + 1}</span>
                  </div>
                  <div className="concept-card-body">
                    <h4>{c}</h4>
                    <span className="concept-card-hint">Click to learn + test →</span>
                  </div>
                </div>
              ))}
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

        {activeTab === 'code' && topic.codeExamples && (
          <div className="tab-content">
            <div className="code-examples">
              {topic.codeExamples.map((ex, i) => (
                <div key={i} className="code-example-item">
                  <p className="code-explanation">{ex.title}</p>
                  <CodeBlock code={ex.code} language={ex.language} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="tab-content">
            <div className="example-selector">
              {topic.examples.map((ex, i) => (
                <button key={i} className={activeExample === i ? 'active' : ''} onClick={() => setActiveExample(i)}>
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

        {activeTab === 'apps' && (
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

        <ConceptModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          concept={selectedConcept}
          topicColor={topic.color}
        />
      </div>
    </div>
  );
};

export default StatisticsDetail;
