import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):  # O(1)
        self.items.append(item)
    
    def dequeue(self):  # O(1)
        if not self.is_empty():
            return self.items.popleft()
    
    def front(self):  # O(1)
        return self.items[0] if not self.is_empty() else None`,

  javascript: `class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {  // O(1)
    this.items.push(item);
  }
  dequeue() {  // O(1)
    return this.items.shift();
  }
  front() {  // O(1)
    return this.items[0];
  }
}`,

  java: `import java.util.LinkedList;

class Queue<T> {
    private LinkedList<T> items = new LinkedList<>();
    void enqueue(T item) { items.addLast(item); }  // O(1)
    T dequeue() { return items.removeFirst(); }  // O(1)
    T front() { return items.getFirst(); }  // O(1)
}`,

  cpp: `#include <queue>

template <typename T>
class Queue {
    std::queue<T> items;
public:
    void enqueue(const T& item) { items.push(item); }  // O(1)
    T dequeue() { 
        T front = items.front();
        items.pop();
        return front;
    }  // O(1)
};`
};

const QueueVisualizer = () => {
  const canvasRef = useRef(null);
  const [queue, setQueue] = useState([10, 20, 30, 40]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      const width = rect.width;
      const height = rect.height;

      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, width, height);

      const cellWidth = 70;
      const cellHeight = 60;
      const startY = (height - cellHeight) / 2;
      const maxDisplay = Math.min(queue.length, 8);
      const totalWidth = maxDisplay * cellWidth + 40;
      const startX = (width - totalWidth) / 2 + 20;

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX - 10, startY - 10);
      ctx.lineTo(startX + maxDisplay * cellWidth + 10, startY - 10);
      ctx.lineTo(startX + maxDisplay * cellWidth + 10, startY + cellHeight + 10);
      ctx.lineTo(startX - 10, startY + cellHeight + 10);
      ctx.stroke();

      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('REAR', startX, startY - 25);

      ctx.fillStyle = '#f59e0b';
      ctx.fillText('FRONT', startX + (maxDisplay - 1) * cellWidth, startY - 25);

      const displayQueue = queue.slice(0, maxDisplay);
      displayQueue.forEach((value, index) => {
        const displayIndex = maxDisplay - 1 - index;
        const x = startX + displayIndex * cellWidth;
        const isFront = index === 0;
        const isRear = index === queue.length - 1;
        const isActive = index === activeIndex;

        ctx.fillStyle = isActive ? '#6366f1' : isFront ? 'rgba(245, 158, 11, 0.3)' : isRear ? 'rgba(34, 197, 94, 0.3)' : '#16162a';
        ctx.fillRect(x, startY, cellWidth - 4, cellHeight);

        ctx.strokeStyle = isActive ? '#8b5cf6' : '#2d2d44';
        ctx.lineWidth = isFront || isRear ? 3 : 2;
        ctx.strokeRect(x, startY, cellWidth - 4, cellHeight);

        ctx.fillStyle = isActive ? '#ffffff' : '#f8fafc';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toString(), x + (cellWidth - 4) / 2, startY + cellHeight / 2);
      });

      if (queue.length === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Empty Queue', width / 2, height / 2);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Inter';
      ctx.fillText('FIFO: First In, First Out', width / 2, height - 30);
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [queue, activeIndex]);

  const enqueue = () => {
    if (queue.length >= 12) return;
    const value = Math.floor(Math.random() * 90) + 10;
    setQueue([...queue, value]);
    setActiveIndex(queue.length);
    setTimeout(() => setActiveIndex(-1), 500);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    setActiveIndex(0);
    setTimeout(() => {
      setQueue(queue.slice(1));
      setActiveIndex(-1);
    }, 500);
  };

  return (
    <div className="visualizer-wrapper">
      <div className="visualizer-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '300px' }} />
      </div>
      <div className="visualizer-controls">
        <button className="btn btn-primary btn-small" onClick={enqueue}>Enqueue</button>
        <button className="btn btn-primary btn-small" onClick={dequeue}>Dequeue</button>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <div className="language-tabs">
          {Object.keys(codeExamples).map((lang) => (
            <button key={lang} className={`language-tab ${language === lang ? 'active' : ''}`} onClick={() => setLanguage(lang)}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
        <div className="code-block"><pre>{codeExamples[language]}</pre></div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
