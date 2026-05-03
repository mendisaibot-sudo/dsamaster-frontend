const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

function getHeaders() {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
}

export async function getUserStats() {
  const res = await fetch(`${API_URL}/api/progress/stats`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function getUserProgress() {
  const res = await fetch(`${API_URL}/api/progress/problems`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch progress');
  return res.json();
}

export async function getProblemProgress(problemId) {
  const res = await fetch(`${API_URL}/api/progress/problem/${problemId}`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch problem progress');
  return res.json();
}

export async function getSubmissions(problemId = null) {
  const url = problemId ? `${API_URL}/api/progress/submissions?problem_id=${problemId}` : `${API_URL}/api/progress/submissions`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch submissions');
  return res.json();
}
