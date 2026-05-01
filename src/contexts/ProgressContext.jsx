import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const defaultProgress = {
  topicsExplored: [],
  problemsSolved: [],
  streak: 0,
  lastActive: null,
  activities: []
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('dsaProgress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem('dsaProgress', JSON.stringify(progress));
  }, [progress]);

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

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  const topicsCount = progress.topicsExplored.length;
  const problemsCount = progress.problemsSolved.length;
  const totalTopics = 12;
  const totalProblems = 30;

  return (
    <ProgressContext.Provider value={{
      progress,
      topicsCount,
      problemsCount,
      totalTopics,
      totalProblems,
      addTopic,
      addSolvedProblem,
      addActivity,
      updateStreak,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
