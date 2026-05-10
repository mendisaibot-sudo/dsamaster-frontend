import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  fetchCategories,
  fetchTopics,
  fetchTopic as fetchTopicApi,
  fetchLesson as fetchLessonApi,
  fetchProgress,
  markComplete,
} from '../services/contentApi';

export const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategories();
      setCategories(data.data || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCategoryWithTopics = useCallback(async (categorySlug) => {
    setLoading(true);
    setError(null);
    try {
      const [catData, topicsData] = await Promise.all([
        (async () => {
          await loadCategories();
        })(),
        fetchTopics(categorySlug),
      ]);
      const cats = categories.length ? categories : [];
      const cat = cats.find((c) => String(c.slug) === String(categorySlug));
      setCurrentCategory(cat || null);
      return topicsData.data || topicsData || [];
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [categories, loadCategories]);

  const loadTopic = useCallback(async (topicId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopicApi(topicId);
      const topic = data.data || data;
      setCurrentTopic(topic);
      return topic;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadLesson = useCallback(async (lessonId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLessonApi(lessonId);
      const lesson = data.data || data;
      setCurrentLesson(lesson);
      return lesson;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProgress = useCallback(async () => {
    if (!user) return;
    try {
      const data = await fetchProgress();
      setProgress(data.data || data || []);
    } catch {
      // Non-fatal; progress is optional
    }
  }, [user]);

  const markLessonComplete = useCallback(async (lessonId) => {
    if (!user) return;
    try {
      await markComplete(lessonId);
      setProgress((prev) => {
        if (prev.find((p) => String(p.lesson_id) === String(lessonId))) return prev;
        return [...prev, { lesson_id: lessonId, completed: true }];
      });
    } catch {
      // Non-fatal
    }
  }, [user]);

  const isLessonCompleted = useCallback(
    (lessonId) => progress.some((p) => String(p.lesson_id) === String(lessonId)),
    [progress]
  );

  return (
    <ContentContext.Provider
      value={{
        categories,
        currentCategory,
        currentTopic,
        currentLesson,
        progress,
        loading,
        error,
        loadCategories,
        loadCategoryWithTopics,
        loadTopic,
        loadLesson,
        loadProgress,
        markLessonComplete,
        isLessonCompleted,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
};
