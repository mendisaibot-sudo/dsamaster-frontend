import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryGrid from './CategoryGrid';
import Sidebar from './Sidebar';
import { getCategories, getTopicsByCategory, getLessonsByTopic, getLesson } from '../../services/contentApi';
import './Learn.css';

export default function LearnPage() {
  const { categorySlug, topicSlug } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load categories');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (categorySlug) {
      getTopicsByCategory(categorySlug)
        .then(data => setTopics(data))
        .catch(console.error);
    } else {
      setTopics([]);
    }
  }, [categorySlug]);

  useEffect(() => {
    if (topicSlug) {
      getLessonsByTopic(topicSlug)
        .then(data => setLessons(data))
        .catch(console.error);
    } else {
      setLessons([]);
    }
  }, [topicSlug]);

  if (loading) return <div className="learn-loading">Loading courses...</div>;
  if (error) return <div className="learn-error">{error}</div>;

  // Show lesson viewer
  if (selectedLesson) {
    return (
      <div className="learn-page">
        <div className="learn-sidebar">
          <Sidebar
            categories={categories}
            topics={topics}
            lessons={lessons}
            currentLesson={selectedLesson}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
          />
        </div>
        <div className="learn-content">
          <LessonViewer lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />
        </div>
      </div>
    );
  }

  // Show lessons for a topic (MUST check before categorySlug)
  if (topicSlug && lessons.length > 0) {
    const topic = topics.find(t => t.slug === topicSlug);
    return (
      <div className="learn-page">
        <div className="learn-sidebar">
          <Sidebar
            categories={categories}
            topics={topics}
            lessons={lessons}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
          />
        </div>
        <div className="learn-content">
          <h2>{topic?.name || 'Lessons'}</h2>
          <p className="learn-desc">{topic?.description}</p>
          <div className="lesson-list">
            {lessons.map((lesson, idx) => (
              <div key={lesson.id} className="lesson-item" onClick={() => setSelectedLesson(lesson)}>
                <span className="lesson-number">{idx + 1}</span>
                <div>
                  <h4>{lesson.title}</h4>
                  <span className="meta">{lesson.estimated_minutes} min • {lesson.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show topics for a category
  if (categorySlug && topics.length > 0) {
    const category = categories.find(c => c.slug === categorySlug);
    return (
      <div className="learn-page">
        <div className="learn-sidebar">
          <Sidebar
            categories={categories}
            topics={topics}
            onSelectTopic={(topic) => navigate(`/learn/${categorySlug}/${topic.slug}`)}
          />
        </div>
        <div className="learn-content">
          <h2>{category?.name || 'Topics'}</h2>
          <p className="learn-desc">{category?.description}</p>
          <div className="topic-list">
            {topics.map(topic => (
              <div key={topic.id} className="topic-card" onClick={() => navigate(`/learn/${categorySlug}/${topic.slug}`)}>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <span className={`difficulty ${topic.difficulty}`}>{topic.difficulty}</span>
                <span className="meta">{topic.estimated_hours}h • {topic.lesson_count} lessons</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback when no topics/lessons match
  if (categorySlug) {
    const category = categories.find(c => c.slug === categorySlug);
    return (
      <div className="learn-page">
        <div className="learn-sidebar">
          <Sidebar
            categories={categories}
            topics={[]}
            onSelectTopic={(topic) => navigate(`/learn/${categorySlug}/${topic.slug}`)}
          />
        </div>
        <div className="learn-content">
          <h2>{category?.name || 'Topics'}</h2>
          <p className="learn-desc">{category?.description}</p>
          <div className="learn-empty">
            <p>Content coming soon for this category.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show categories grid
  return (
    <div className="learn-page learn-home">
      <div className="learn-header">
        <h1>Learn Programming</h1>
        <p>Master Python, JavaScript, SQL, React, Node.js & System Design</p>
      </div>
      <CategoryGrid categories={categories} />
    </div>
  );
}

function LessonViewer({ lesson, onBack }) {
  const [fullLesson, setFullLesson] = useState(null);

  useEffect(() => {
    getLesson(lesson.slug).then(data => setFullLesson(data));
  }, [lesson.slug]);

  const data = fullLesson || lesson;

  return (
    <div className="lesson-viewer">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h1>{data.title}</h1>

      {data.content && (
        typeof data.content === 'string' ? (
          <div className="lesson-body">
            <p>{data.content}</p>
          </div>
        ) : (
          <div className="lesson-body">
            {data.content.title && (
              <div className="lesson-header">
                <h2>{data.content.title}</h2>
              </div>
            )}
            {Array.isArray(data.content.blocks) && data.content.blocks.map((block, idx) => (
              <div key={idx} className={`content-block block-${block.type}`}>
                {block.type === 'text' && <p>{block.content}</p>}
                {block.type === 'heading' && <h2>{block.content}</h2>}
                {block.type === 'code' && (
                  <div className="code-example">
                    <div className="code-header">
                      <span className="code-lang">{block.language || 'code'}</span>
                    </div>
                    <pre><code>{block.content}</code></pre>
                  </div>
                )}
                {block.type === 'list' && Array.isArray(block.content) && (
                  <ul>
                    {block.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {block.type === 'tip' && (
                  <div className="tip-box">
                    <strong>💡 Tip:</strong> <span>{block.content}</span>
                  </div>
                )}
                {block.type === 'exercise' && (
                  <div className="exercise-box">
                    <h4>🎯 Exercise</h4>
                    <p>{block.content}</p>
                  </div>
                )}
              </div>
            ))}
            {!data.content.blocks && Object.entries(data.content).map(([section, content]) => (
              <section key={section}>
                <h3>{section}</h3>
                <p>{content}</p>
              </section>
            ))}
          </div>
        )
      )}
      {data.code_examples?.map(ex => (
        <div key={ex.id} className="code-example">
          <div className="code-header">
            <span className="code-lang">{ex.language}</span>
          </div>
          <pre><code>{ex.code}</code></pre>
          {ex.output && (
            <div className="code-output">
              <strong>Output:</strong>
              <pre>{ex.output}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
