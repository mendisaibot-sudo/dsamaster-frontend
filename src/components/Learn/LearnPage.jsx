import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaCode, FaLightbulb } from 'react-icons/fa';
import CategoryGrid from './CategoryGrid';
import Sidebar from './Sidebar';
import LessonViewer from './LessonViewer';
import LessonExercise from './LessonExercise';
import CodeEditor from '../CodeEditor/CodeEditor';
import { useContent } from '../../contexts/ContentContext';
import { useProgress } from '../../contexts/ProgressContext';
import { getCategories, getTopicsByCategory, getLessonsByTopic, getLesson } from '../../services/contentApi';
import './Learn.css';
import './LessonExercise.css';

const TABS = [
  { key: 'content', label: 'Content', icon: FaBookOpen },
  { key: 'practice', label: 'Practice', icon: FaLightbulb },
  { key: 'code', label: 'Code', icon: FaCode },
];

export default function LearnPage() {
  const { categorySlug, topicSlug, lessonSlug } = useParams();
  const navigate = useNavigate();
  const { markLessonComplete, isLessonCompleted } = useContent();
  const { completeLesson, submitExercise } = useProgress();
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [fullLesson, setFullLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
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

  // Auto-select lesson from URL
  useEffect(() => {
    if (lessonSlug && lessons.length > 0) {
      const lesson = lessons.find(l => l.slug === lessonSlug);
      if (lesson) setSelectedLesson(lesson);
    }
  }, [lessonSlug, lessons]);

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

  useEffect(() => {
    if (selectedLesson) {
      setFullLesson(null);
      setActiveTab('content');
      getLesson(selectedLesson.slug).then(data => setFullLesson(data));
    }
  }, [selectedLesson]);

  if (loading) return <div className="learn-loading">Loading courses...</div>;
  if (error) return <div className="learn-error">{error}</div>;

  if (selectedLesson) {
    const lessonData = fullLesson || selectedLesson;
    const completed = isLessonCompleted(lessonData.id);
    const exerciseCount = lessonData.exercises?.length || 0;

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
          <button className="back-btn" onClick={() => {
            setSelectedLesson(null);
            setActiveTab('content');
            setFullLesson(null);
          }}>← Back</button>

          <h1 className="lesson-title">{lessonData.title}</h1>

          <div className="lesson-meta-row">
            <span className="lesson-estimated-time">🕐 {lessonData.estimated_minutes || 10} min</span>
            <span className={`difficulty ${lessonData.difficulty}`}>
              {lessonData.difficulty}
            </span>
          </div>

          <div className="lesson-tabs">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`lesson-tab ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <Icon size={14} />
                  {tab.label}
                  {tab.key === 'practice' && exerciseCount > 0 && (
                    <span className="tab-badge">{exerciseCount}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="lesson-tab-panel">
            {activeTab === 'content' && (
              <LessonViewer
                lesson={lessonData}
                onComplete={() => {
                  markLessonComplete(lessonData.id);
                  completeLesson(lessonData.slug);
                }}
                isCompleted={completed}
              />
            )}

            {activeTab === 'practice' && (
              <LessonExercise
                exercises={lessonData.exercises || []}
                lessonSlug={lessonData.slug}
                onSubmitExercise={submitExercise}
              />
            )}

            {activeTab === 'code' && (
              <div className="code-tab-content animate-fade-in">
                <CodeEditor
                  code={lessonData.code || lessonData.code_examples?.[0]?.code || '// Try some code here...'}
                  language={lessonData.language || 'javascript'}
                  onChange={() => {}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
