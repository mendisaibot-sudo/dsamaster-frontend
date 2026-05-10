const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

async function apiFetch(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { credentials: 'include' });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.warn('API call failed:', err);
    return null;
  }
}

export const fetchCategories = async () => {
  const result = await apiFetch('/api/content/categories');
  return result || [];  // Return empty array on failure instead of mocks
};

export const fetchTopics = async (cat) => {
  const result = await apiFetch(`/api/content/categories/${cat}/topics`);
  return result || [];
};

export const fetchTopic = async (id) => {
  const topics = await fetchTopics(id);
  return topics[0] || null;
};

export const fetchLesson = async (slug) => {
  const result = await apiFetch(`/api/content/lessons/${slug}`);
  return result || { title: slug, content: { title: 'Loading...', blocks: [] }, code: '' };
};

export const getCategories = fetchCategories;
export const getTopicsByCategory = fetchTopics;
export const getLessonsByTopic = async (topic) => {
  const result = await apiFetch(`/api/content/topics/${topic}/lessons`);
  return result || [];
};
export const getLesson = fetchLesson;
export const markComplete = async (slug) => {
  const token = localStorage.getItem('access_token');
  if (!token) return { success: false, error: 'Not authenticated' };
  try {
    const res = await fetch(`${API_URL}/api/progress/lesson/${slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: 'completed' })
    });
    return res.ok ? { success: true } : { success: false, error: res.status };
  } catch {
    return { success: false, error: 'Network error' };
  }
};

export const fetchProgress = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) return [];
  try {
    const res = await fetch(`${API_URL}/api/progress/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.lesson_progress || []).map(lp => lp.lesson_slug || lp.lesson_id).filter(Boolean);
  } catch {
    return [];
  }
};
