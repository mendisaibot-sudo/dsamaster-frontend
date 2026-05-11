import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaChevronRight, FaChevronDown, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { getTopicsByCategory, getLessonsByTopic } from '../../services/contentApi';
import { useContent } from '../../contexts/ContentContext';
import './Learn.css';

export default function Sidebar({ categories }) {
  const { categorySlug, topicSlug, lessonSlug } = useParams();
  const location = useLocation();
  const { isLessonCompleted } = useContent();

  // Store topics per category slug: { [slug]: { topics: [], loading: boolean, loaded: boolean } }
  const [categoryTopics, setCategoryTopics] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-expand current category and topic on mount / navigation
  useEffect(() => {
    if (categorySlug) {
      setExpandedCategories((prev) => ({ ...prev, [categorySlug]: true }));
      // Also load topics for current category if not already loaded
      setCategoryTopics((prev) => {
        if (prev[categorySlug]?.loaded) return prev;
        return { ...prev, [categorySlug]: { topics: [], loading: true, loaded: false } };
      });
      fetchTopicsForCategory(categorySlug);
    }
    if (topicSlug) {
      setExpandedTopics((prev) => ({ ...prev, [topicSlug]: true }));
    }
  }, [categorySlug, topicSlug]);

  async function fetchTopicsForCategory(slug) {
    try {
      const topics = await getTopicsByCategory(slug);
      // For each topic, try to fetch its lessons
      const topicsWithLessons = await Promise.all(
        (topics || []).map(async (topic) => {
          try {
            const lessons = await getLessonsByTopic(topic.slug);
            return { ...topic, lessons: lessons || [] };
          } catch {
            return { ...topic, lessons: [] };
          }
        })
      );
      setCategoryTopics((prev) => ({
        ...prev,
        [slug]: { topics: topicsWithLessons, loading: false, loaded: true },
      }));
    } catch {
      setCategoryTopics((prev) => ({
        ...prev,
        [slug]: { topics: [], loading: false, loaded: true },
      }));
    }
  }

  const toggleCategory = (slug) => {
    const willExpand = !expandedCategories[slug];
    setExpandedCategories((prev) => ({ ...prev, [slug]: willExpand }));
    if (willExpand && !categoryTopics[slug]?.loaded) {
      setCategoryTopics((prev) => ({
        ...prev,
        [slug]: { ...(prev[slug] || { topics: [] }), loading: true, loaded: false },
      }));
      fetchTopicsForCategory(slug);
    }
  };

  const toggleTopic = (slug) => {
    setExpandedTopics((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const isActiveLesson = (slug) => lessonSlug === slug;

  return (
    <>
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>
      <aside className={`learn-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="learn-sidebar-header">
          <h3>Learn</h3>
        </div>
        <div className="learn-sidebar-scroll">
          {categories.map((cat) => {
            const catData = categoryTopics[cat.slug] || { topics: [], loading: false, loaded: false };
            return (
              <div key={cat.id} className="sidebar-category">
                <button
                  className={`sidebar-category-btn ${categorySlug === cat.slug ? 'active' : ''}`}
                  onClick={() => toggleCategory(cat.slug)}
                >
                  <span className="sidebar-category-name">{cat.name}</span>
                  {expandedCategories[cat.slug] ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                </button>
                {expandedCategories[cat.slug] && (
                  <div className="sidebar-topics">
                    {catData.loading ? (
                      <div className="sidebar-loading">Loading…</div>
                    ) : catData.topics.length === 0 ? (
                      <div className="sidebar-empty">No topics yet</div>
                    ) : (
                      catData.topics.map((topic) => {
                        const active = topicSlug === topic.slug;
                        return (
                          <div key={topic.id} className="sidebar-topic-wrap">
                            <button
                              className={`sidebar-topic-btn ${active ? 'active' : ''}`}
                              onClick={() => toggleTopic(topic.slug)}
                            >
                              <span>{topic.name}</span>
                              {expandedTopics[topic.slug] ? (
                                <FaChevronDown size={10} />
                              ) : (
                                <FaChevronRight size={10} />
                              )}
                            </button>
                            {expandedTopics[topic.slug] && (
                              <ul className="sidebar-lessons">
                                {(topic.lessons || []).map((lesson) => {
                                  const completed = isLessonCompleted(lesson.id);
                                  return (
                                    <li key={lesson.id}>
                                      <Link
                                        to={`/learn/${cat.slug}/${topic.slug}/${lesson.slug}`}
                                        className={`sidebar-lesson-link ${isActiveLesson(lesson.slug) ? 'active' : ''}`}
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        <span className="sidebar-lesson-title">{lesson.title}</span>
                                        {completed && (
                                          <FaCheckCircle size={12} className="sidebar-check" />
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
