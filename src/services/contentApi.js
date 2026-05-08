// contentApi.js — Content Platform API Layer
// All content API calls go through here. No direct fetch calls in components.

const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { message: text }; }
    const error = new Error(err.message || `HTTP ${res.status}`);
    error.status = res.status;
    error.body = err;
    throw error;
  }
  return res.json().catch(() => ({}));
}

export const fetchCategories = () =>
  apiFetch('/api/content/categories');

export const fetchTopics = (categoryId) =>
  apiFetch(`/api/content/categories/${categoryId}/topics`);

export const fetchTopic = (topicId) =>
  apiFetch(`/api/content/topics/${topicId}`);

export const fetchLesson = (lessonId) =>
  apiFetch(`/api/content/lessons/${lessonId}`);

export const fetchExercises = (lessonId) =>
  apiFetch(`/api/content/lessons/${lessonId}/exercises`);

export const checkAnswer = (exerciseId, answer) =>
  apiFetch(`/api/content/exercises/${exerciseId}/check`, {
    method: 'POST',
    body: JSON.stringify({ answer }),
  });

export const markComplete = (lessonId) =>
  apiFetch(`/api/content/progress/${lessonId}/complete`, {
    method: 'POST',
  });

export const fetchProgress = () =>
  apiFetch('/api/content/progress');

export const searchContent = (query) =>
  apiFetch(`/api/content/search?q=${encodeURIComponent(query)}`);
