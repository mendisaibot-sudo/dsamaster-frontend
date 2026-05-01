import { Link } from 'react-router-dom';
import { sortingAlgorithms, searchingAlgorithms } from '../../data/algorithms';
import './Algorithms.css';

const Algorithms = () => {
  return (
    <section id="algorithms" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Algorithms</h2>
          <p>Master sorting and searching algorithms with step-by-step visualizations</p>
        </div>

        <div className="algo-category">
          <h3>Sorting Algorithms</h3>
          <div className="algo-grid">
            {sortingAlgorithms.map((algo) => (
              <Link key={algo.id} to={`/algorithm/${algo.id}`} className="algo-card card-interactive">
                <div className="algo-header">
                  <h4>{algo.name}</h4>
                  <span className="complexity-badge complexity-time">{algo.complexity}</span>
                </div>
                <p>{algo.description}</p>
                <div className="algo-details">
                  <span>Best: {algo.bestCase}</span>
                  <span>Worst: {algo.worstCase}</span>
                </div>
                <span className="algo-link">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="algo-category">
          <h3>Searching Algorithms</h3>
          <div className="algo-grid">
            {searchingAlgorithms.slice(0, 2).map((algo) => (
              <Link key={algo.id} to={`/algorithm/${algo.id}`} className="algo-card card-interactive">
                <div className="algo-header">
                  <h4>{algo.name}</h4>
                  <span className="complexity-badge complexity-time">{algo.complexity}</span>
                </div>
                <p>{algo.description}</p>
                <div className="algo-details">
                  <span>Best: {algo.bestCase}</span>
                  <span>Worst: {algo.worstCase}</span>
                </div>
                <span className="algo-link">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Algorithms;
