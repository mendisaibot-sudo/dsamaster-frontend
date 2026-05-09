const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Python', slug: 'python', description: 'Learn Python from basics to advanced', topic_count: 3, lesson_count: 15, icon: 'python', color: '#3776AB' },
  { id: '2', name: 'JavaScript', slug: 'javascript', description: 'Master JavaScript & ES6+ features', topic_count: 4, lesson_count: 20, icon: 'javascript', color: '#F7DF1E' },
  { id: '3', name: 'SQL', slug: 'sql', description: 'Database queries & optimization', topic_count: 3, lesson_count: 12, icon: 'sql', color: '#336791' },
  { id: '4', name: 'React', slug: 'react', description: 'Build modern UIs with React', topic_count: 3, lesson_count: 15, icon: 'react', color: '#61DAFB' },
  { id: '5', name: 'Node.js', slug: 'nodejs', description: 'Backend with Node & Express', topic_count: 2, lesson_count: 10, icon: 'node', color: '#339933' },
  { id: '6', name: 'System Design', slug: 'system-design', description: 'Architect scalable systems', topic_count: 3, lesson_count: 12, icon: 'system', color: '#FF6B6B' },
];

const MOCK_TOPICS = {
  python: [
    { id: 'p1', name: 'Python Basics', slug: 'python-basics', description: 'Variables, loops, functions', difficulty: 'beginner', estimated_hours: 5, lesson_count: 5 },
    { id: 'p2', name: 'OOP in Python', slug: 'python-oop', description: 'Classes, inheritance', difficulty: 'intermediate', estimated_hours: 6, lesson_count: 5 },
    { id: 'p3', name: 'Python Advanced', slug: 'python-advanced', description: 'Decorators, async', difficulty: 'advanced', estimated_hours: 4, lesson_count: 5 },
  ],
  javascript: [
    { id: 'j1', name: 'JS Basics', slug: 'js-basics', description: 'Variables, types, control flow', difficulty: 'beginner', estimated_hours: 5, lesson_count: 5 },
    { id: 'j2', name: 'DOM & Events', slug: 'dom-events', description: 'Manipulate web pages', difficulty: 'intermediate', estimated_hours: 5, lesson_count: 5 },
    { id: 'j3', name: 'ES6+ Features', slug: 'es6-features', description: 'Arrow functions, modules', difficulty: 'intermediate', estimated_hours: 5, lesson_count: 5 },
    { id: 'j4', name: 'Async JS', slug: 'async-js', description: 'Promises, async/await', difficulty: 'advanced', estimated_hours: 5, lesson_count: 5 },
  ],
  sql: [
    { id: 's1', name: 'SQL Basics', slug: 'sql-basics', description: 'SELECT, INSERT, etc', difficulty: 'beginner', estimated_hours: 4, lesson_count: 4 },
    { id: 's2', name: 'Joins', slug: 'joins-queries', description: 'INNER, LEFT joins', difficulty: 'intermediate', estimated_hours: 4, lesson_count: 4 },
  ],
  react: [
    { id: 'r1', name: 'Components & JSX', slug: 'components-jsx', description: 'Build components', difficulty: 'beginner', estimated_hours: 5, lesson_count: 5 },
    { id: 'r2', name: 'Hooks', slug: 'hooks-state', description: 'useState, useEffect', difficulty: 'intermediate', estimated_hours: 5, lesson_count: 5 },
    { id: 'r3', name: 'Advanced Patterns', slug: 'advanced-patterns', description: 'Context, reducers', difficulty: 'advanced', estimated_hours: 5, lesson_count: 5 },
  ],
};

const MOCK_LESSONS = {
  'python-basics': [
    { id: 'l1', title: 'Variables & Data Types', slug: 'variables-types', difficulty: 'beginner', estimated_minutes: 10, code: 'x = 5\nname = "Alice"' },
    { id: 'l2', title: 'Control Flow', slug: 'control-flow', difficulty: 'beginner', estimated_minutes: 15, code: 'for i in range(5):\n    print(i)' },
    { id: 'l3', title: 'Functions', slug: 'functions', difficulty: 'beginner', estimated_minutes: 15, code: 'def greet(name):\n    return f"Hello {name}"' },
  ],
};

async function apiFetch(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { credentials: 'include' });
    if (!res.ok) throw new Error();
    return res.json();
  } catch { return null; }
}

export const fetchCategories = async () => {
  return (await apiFetch('/api/content/categories')) || MOCK_CATEGORIES;
};

export const fetchTopics = async (cat) => {
  return (await apiFetch(`/api/content/categories/${cat}/topics`)) || MOCK_TOPICS[cat] || [];
};

export const fetchTopic = async (id) => {
  const topics = await fetchTopics(id);
  return topics[0] || null;
};

export const fetchLesson = async (slug) => {
  return (await apiFetch(`/api/content/lessons/${slug}`)) || { title: slug, content: { Content: 'Coming soon.' }, code: '' };
};

export const getCategories = fetchCategories;
export const getTopicsByCategory = fetchTopics;
export const getLessonsByTopic = async (topic) => {
  return (await apiFetch(`/api/content/topics/${topic}/lessons`)) || MOCK_LESSONS[topic] || [];
};
export const getLesson = fetchLesson;
export const markComplete = async () => ({ success: true });
export const fetchProgress = async () => [];
