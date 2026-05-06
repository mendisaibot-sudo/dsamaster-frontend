import { Link } from 'react-router-dom';
import { statisticsTopics } from '../../data/statistics';
import './Statistics.css';
import { FaChartPie, FaDice, FaChartLine, FaFlask, FaSync, FaRandom, FaExpandAlt, FaTable } from 'react-icons/fa';

const iconMap = {
  FaChartPie, FaDice, FaChartLine, FaFlask, FaSync, FaRandom, FaExpandAlt, FaTable
};

const StatisticsListing = () => {
  const categories = [...new Set(statisticsTopics.map(t => t.category))];

  return (
    <section id="statistics" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Statistics</h2>
          <p>Master statistical concepts with clear definitions, formulas, and real-world examples</p>
        </div>

        {categories.map(cat => (
          <div key={cat} className="stat-category">
            <h3 className="cat-title">{cat}</h3>
            <div className="stat-grid">
              {statisticsTopics.filter(t => t.category === cat).map(topic => {
                const IconComp = iconMap[topic.icon] || FaChartPie;
                return (
                  <Link key={topic.id} to={`/statistics/${topic.id}`} className="stat-card card-interactive">
                    <div className="stat-icon" style={{ background: topic.color }}>
                      <IconComp />
                    </div>
                    <div className="stat-content">
                      <h4>{topic.name}</h4>
                      <p>{topic.description}</p>
                      <div className="stat-meta">
                        <span className="stat-concepts">{topic.concepts.length} concepts</span>
                        <span className="stat-examples">{topic.examples.length} examples</span>
                      </div>
                    </div>
                    <span className="stat-link">Learn More →</span>
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

export default StatisticsListing;
