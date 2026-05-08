import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaChevronRight, FaChevronDown, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useContent } from '../../contexts/ContentContext';
import './Learn.css';

export default function Sidebar({ categories }) {
  const { categorySlug, topicSlug, lessonSlug } = useParams();
  const location = useLocation();
  const { currentTopic, currentCategory, loadCategoryWithTopics, isLessonCompleted } = useContent();

  const [topics, setTopics] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);

  // Auto-expand active category and topic
  useEffect(() => {
    if (categorySlug) {
      setExpandedCategories((prev) => ({ ...prev, [categorySlug]: true }));
    }
    if (topicSlug) {
      setExpandedTopics((prev) => ({ ...prev, [topicSlug]: true }));
    }
  }, [categorySlug, topicSlug]);

  // Load topics when on a category page
  useEffect(() => {
    if (!categorySlug || !categories.length) return;
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return;
    setLoadingTopics(true);
    loadCategoryWithTopics(cat.id).then((t) => {
      setTopics(Array.isArray(t) ? t : t?.data || []);
      setLoadingTopics(false);
    });
  }, [categorySlug, categories, loadCategoryWithTopics]);

  // If on a lesson page, ensure currentTopic is available and corresponding topic's lessons are shown
  useEffect(() => {
    if (currentTopic && currentTopic.topics) {
      // Backend may return nested topics under a category fetch
      setTopics(currentTopic.topics || []);
    }
    if (currentTopic && currentTopic.lessons) {
      // If currentTopic itself has lessons, merge them
      setTopics((prev) => {
        const existing = prev.find((t) => String(t.id) === String(currentTopic.id));
        if (existing) return prev;
        return [...prev, currentTopic];
      });
    }
  }, [currentTopic]);

  const toggleCategory = (slug) => {
    setExpandedCategories((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const toggleTopic = (slug) => {
    setExpandedTopics((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const isActive = (path) => location.pathname === path;
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
          {categories.map((cat) => (
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
                  {loadingTopics && categorySlug === cat.slug ? (
                    <div className="sidebar-loading">Loading…</div>
                  ) : (
                    topics.map((topic) => {
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
          ))}
        </div>
      </aside>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
