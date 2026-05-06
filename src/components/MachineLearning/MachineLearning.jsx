import { Link } from 'react-router-dom';
import { mlTopics } from '../../data/machineLearning';
import { FaBrain } from 'react-icons/fa';
import './MachineLearning.css';

const iconMap = {
  FaBrain: FaBrain,
};

const MachineLearning = () => {
  return (
    <section id="machinelearning" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Machine Learning</h2>
          <p>Master AI with interactive visualizations of ML algorithms and concepts</p>
        </div>

        <div className="ml-grid">
          {mlTopics.map((topic) => (
            <Link key={topic.id} to={`/machine-learning/${topic.id}`} className="ml-card card-interactive">
              <div className="ml-icon" style={{ background: topic.color }}>
                <FaBrain />
              </div>
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              <span className="ml-link">Learn More <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineLearning;
