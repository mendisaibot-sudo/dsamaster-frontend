import { useNavigate } from 'react-router-dom';
import { FaPython, FaJs, FaDatabase, FaReact, FaNode, FaProjectDiagram } from 'react-icons/fa';
import './Learn.css';

const CATEGORY_COLORS = {
  Python: '#3776AB',
  JavaScript: '#F7DF1E',
  SQL: '#336791',
  React: '#61DAFB',
  Node: '#339933',
  SystemDesign: '#FF6B6B',
};

const CATEGORY_ICONS = {
  Python: FaPython,
  JavaScript: FaJs,
  SQL: FaDatabase,
  React: FaReact,
  Node: FaNode,
  SystemDesign: FaProjectDiagram,
};

export default function CategoryGrid({ categories }) {
  const navigate = useNavigate();

  return (
    <div className="category-grid">
      {categories.map((cat) => {
        const Icon = CATEGORY_ICONS[cat.name] || CATEGORY_ICONS.Python;
        const color = CATEGORY_COLORS[cat.name] || '#6366f1';
        return (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => navigate(`/learn/${cat.slug}`)}
            style={{
              borderLeft: `4px solid ${color}`,
              '--cat-accent': color,
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate(`/learn/${cat.slug}`);
            }}
          >
            <div className="category-card-icon" style={{ color }}>
              <Icon size={36} />
            </div>
            <div className="category-card-body">
              <h3 className="category-card-title">{cat.name}</h3>
              <p className="category-card-desc">{cat.description}</p>
              <div className="category-card-meta">
                <span>{cat.topic_count ?? 0} topics</span>
                <span>{cat.lesson_count ?? 0} lessons</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
