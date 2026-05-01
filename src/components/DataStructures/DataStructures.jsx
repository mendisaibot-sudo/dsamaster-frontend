import { Link } from 'react-router-dom';
import { dataStructures } from '../../data/dataStructures';
import './DataStructures.css';

const DataStructures = () => {
  return (
    <section id="datastructures" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Data Structures</h2>
          <p>Explore fundamental data structures with interactive visualizations</p>
        </div>

        <div className="ds-grid">
          {dataStructures.map((ds) => (
            <Link key={ds.id} to={`/datastructure/${ds.id}`} className="ds-card card-interactive">
              <div className="ds-icon" style={{ background: ds.color }}>
                <ds.icon />
              </div>
              <h3>{ds.name}</h3>
              <p>{ds.description}</p>
              <span className="ds-link">Learn More →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataStructures;
