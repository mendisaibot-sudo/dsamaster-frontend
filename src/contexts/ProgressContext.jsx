import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

const defaultProgress = {
  topicsExplored: [],
  problemsSolved: [],
  completedLessons: [],
  completedExercises: {},
  streak: 0,
  lastActive: null,
  activities: []
};

const LEGACY_KEY = 'dsaProgress';

const getStorageKey = (userId) => userId ? `dsaProgress_${userId}` : LEGACY_KEY;

export const ProgressProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const userId = user?.id || null;
  const storageKey = getStorageKey(userId);

  const [progress, setProgress] = useState(() => {
    // Try user-specific key first, then legacy key
    const saved = localStorage.getItem(storageKey) || localStorage.getItem(LEGACY_KEY);
    return saved ? JSON.parse(saved) : { ...defaultProgress };
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load/save from localStorage
  useEffect(() => {
    if (!userId) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      // Migrate legacy data to user-specific key on first login
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        setProgress(JSON.parse(legacy));
      }
    }
  }, [userId, storageKey]);

  // Save whenever progress changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  // Sync with backend when logged in
  const syncWithBackend = useCallback(async () => {
    if (!isLoggedIn || !userId) return;
    const token = localStorage.getItem('access_token');
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://dsamaster.de/api/progress/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          const backendStats = data.data;
          setProgress(prev => ({
            ...prev,
            problemsSolved: prev.problemsSolved, // Keep local additions
            streak: backendStats.current_streak || prev.streak,
            lastActive: backendStats.last_solved_at || prev.lastActive
          }));
        }
      }
    } catch (err) {
      // Backend sync failed, continue with localStorage
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, userId]);

  // Sync on login
  useEffect(() => {
    if (isLoggedIn && userId) {
      syncWithBackend();
    }
  }, [isLoggedIn, userId, syncWithBackend]);

  const addTopic = (topic) => {
    setProgress(prev => {
      if (prev.topicsExplored.includes(topic)) return prev;
      return {
        ...prev,
        topicsExplored: [...prev.topicsExplored, topic],
        activities: [
          { description: `Explored ${topic}`, timestamp: new Date().toISOString() },
          ...prev.activities.slice(0, 9)
        ]
      };
    });
  };

  const addSolvedProblem = (problemId) => {
    setProgress(prev => {
      if (prev.problemsSolved.includes(problemId)) return prev;
      return {
        ...prev,
        problemsSolved: [...prev.problemsSolved, problemId],
        activities: [
          { description: `Solved problem #${problemId}`, timestamp: new Date().toISOString() },
          ...prev.activities.slice(0, 9)
        ]
      };
    });
  };

  const addActivity = (description) => {
    setProgress(prev => ({
      ...prev,
      activities: [
        { description, timestamp: new Date().toISOString() },
        ...prev.activities.slice(0, 9)
      ]
    }));
  };

  const updateStreak = () => {
    setProgress(prev => {
      const today = new Date().toDateString();
      const lastActive = prev.lastActive ? new Date(prev.lastActive).toDateString() : null;

      if (lastActive === today) return prev;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasActiveYesterday = lastActive === yesterday.toDateString();

      return {
        ...prev,
        lastActive: new Date().toISOString(),
        streak: wasActiveYesterday ? prev.streak + 1 : 1
      };
    });
  };

  const completeLesson = useCallback(async (lessonSlug) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        await fetch(`https://dsamaster.de/api/content/lessons/${lessonSlug}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: 'completed' })
        });
      } catch { /* non-fatal */ }
    }
    setProgress(prev => {
      if (prev.completedLessons?.includes(lessonSlug)) return prev;
      return {
        ...prev,
        completedLessons: [...(prev.completedLessons || []), lessonSlug],
        activities: [
          { description: `Completed lesson ${lessonSlug}`, timestamp: new Date().toISOString() },
          ...prev.activities.slice(0, 9)
        ]
      };
    });
  }, []);

  const submitExercise = useCallback(async (lessonSlug, exerciseId, answer) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        await fetch(`https://dsamaster.de/api/content/lessons/${lessonSlug}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ exercise_id: exerciseId, answer })
        });
      } catch { /* non-fatal */ }
    }
    setProgress(prev => {
      const key = `${lessonSlug}/${exerciseId}`;
      return {
        ...prev,
        completedExercises: { ...(prev.completedExercises || {}), [key]: { answer, submittedAt: new Date().toISOString() } }
      };
    });
  }, []);

  const resetProgress = () => {
    setProgress({ ...defaultProgress });
    if (userId) {
      localStorage.removeItem(storageKey);
    }
  };

  const topicsCount = progress.topicsExplored.length;
  const problemsCount = progress.problemsSolved.length;
  const totalTopics = 12;
  const totalProblems = 30;

  return (
      value={{
        progress,
        topicsCount,
        problemsCount,
        totalTopics,
        totalProblems,
        addTopic,
        addSolvedProblem,
        addActivity,
        updateStreak,
        resetProgress,
        completeLesson,
        submitExercise,
        isLoading,
        syncWithBackend,
        userId
      }}
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
