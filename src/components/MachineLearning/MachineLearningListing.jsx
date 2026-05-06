import { Link } from 'react-router-dom';
import { mlTopics } from '../../data/machineLearning';
import './MachineLearning.css';
import { FaBrain, FaRobot, FaChartArea, FaTree, FaNetworkWired, FaBuffer, FaPeopleArrows, FaProjectDiagram, FaCompressArrowsAlt, FaBalanceScale } from 'react-icons/fa';

const iconMap = {
  FaBrain, FaRobot, FaChartArea, FaTree, FaNetworkWired, FaBuffer, FaPeopleArrows, FaProjectDiagram, FaCompressArrowsAlt, FaBalanceScale
};

const MachineLearningListing = () => {
  const categories = [...new Set(mlTopics.map(t => t.category))];

  return (
    <section id="machinelearning" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Machine Learning</h2>
          <p>Master ML concepts with clear definitions, formulas, and real-world examples</p>
        </div>

        {categories.map(cat => (
          <div key={cat} className="ml-category">
            <h3 className="cat-title">{cat}</h3>
            <div className="ml-grid">
              {mlTopics.filter(t => t.category === cat).map(topic => {
                const IconComp = iconMap[topic.icon] || FaBrain;
                return (
                  <Link key={topic.id} to={`/ml/${topic.id}`} className="ml-card card-interactive">
                    <div className="ml-icon" style={{ background: topic.color }}>
                      <IconComp />
                    </div>
                    <div className="ml-content">
                      <h4>{topic.name}</h4>
                      <p>{topic.description}</p>
                      <div className="ml-meta">
                        <span className="ml-concepts">{topic.concepts.length} concepts</span>
                        <span className="ml-examples">{topic.examples.length} examples</span>
                      </div>
                    </div>
                    <span className="ml-link">Learn More →</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MachineLearningListing;
