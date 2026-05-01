import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `class Stack:
    def __init__(self):
        self.items = []
    
    # Push - O(1)
    def push(self, item):
        self.items.append(item)
    
    # Pop - O(1)
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Stack is empty")
    
    # Peek - O(1)
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        raise IndexError("Stack is empty")
    
    def is_empty(self):
        return len(self.items) == 0`,

  javascript: `class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}`,

  java: `class Stack<T> {
    private ArrayList<T> items = new ArrayList<>();
    
    void push(T item) {
        items.add(item);
    }
    
    T pop() {
        return items.remove(items.size() - 1);
    }
    
    T peek() {
        return items.get(items.size() - 1);
    }
}`,

  cpp: `template <typename T>
class Stack {
    vector<T> items;
public:
    void push(const T& item) {
        items.push_back(item);
    }
    T pop() {
        T top = items.back();
        items.pop_back();
        return top;
    }
};`
};

const StackVisualizer = () => {
  const canvasRef = useRef(null);
  const [stack, setStack] = useState([45, 30, 25, 15]);
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

      const cellWidth = 100;
      const cellHeight = 50;
      const startX = (width - cellWidth) / 2;
      const startY = height - 50;
      const maxDisplay = Math.min(stack.length, 6);

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX - 5, 50);
      ctx.lineTo(startX - 5, startY);
      ctx.lineTo(startX + cellWidth + 5, startY);
      ctx.lineTo(startX + cellWidth + 5, 50);
      ctx.stroke();

      const displayStack = stack.slice(-maxDisplay);
      displayStack.forEach((value, index) => {
        const actualIndex = stack.length - maxDisplay + index;
        const y = startY - (index + 1) * cellHeight;
        const isActive = actualIndex === activeIndex;
        const isTop = actualIndex === stack.length - 1;

        ctx.fillStyle = isActive ? '#6366f1' : isTop ? 'rgba(99, 102, 241, 0.3)' : '#16162a';
        ctx.fillRect(startX, y, cellWidth, cellHeight - 2);

        ctx.strokeStyle = isActive ? '#8b5cf6' : '#2d2d44';
        ctx.lineWidth = isTop ? 3 : 2;
        ctx.strokeRect(startX, y, cellWidth, cellHeight - 2);

        ctx.fillStyle = isActive ? '#ffffff' : '#f8fafc';
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toString(), startX + cellWidth / 2, y + cellHeight / 2);
      });

      if (stack.length > 0) {
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('TOP', startX + cellWidth / 2, startY - displayStack.length * cellHeight - 15);
      }

      if (stack.length === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Empty Stack', width / 2, height / 2);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Inter';
      ctx.fillText('LIFO: Last In, First Out', width / 2, 30);
    };

    draw();
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stack, activeIndex]);

  const push = async () => {
    if (stack.length >= 10) return;
    const value = Math.floor(Math.random() * 90) + 10;
    setActiveIndex(stack.length);
    setStack([...stack, value]);
    await new Promise(r => setTimeout(r, 500));
    setActiveIndex(-1);
  };

  const pop = async () => {
    if (stack.length === 0) return;
    setActiveIndex(stack.length - 1);
    await new Promise(r => setTimeout(r, 500));
    setStack(stack.slice(0, -1));
    setActiveIndex(-1);
  };

  const peek = async () => {
    if (stack.length === 0) return;
    setActiveIndex(stack.length - 1);
    await new Promise(r => setTimeout(r, 800));
    setActiveIndex(-1);
  };

  const reset = () => {
    setStack([45, 30, 25, 15]);
    setActiveIndex(-1);
  };

  return (
    <div className="visualizer-wrapper">
      <div className="visualizer-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '350px' }} />
      </div>

      <div className="visualizer-controls">
        <button className="btn btn-primary btn-small" onClick={push}>Push</button>
        <button className="btn btn-primary btn-small" onClick={pop}>Pop</button>
        <button className="btn btn-secondary btn-small" onClick={peek}>Peek</button>
        <button className="btn btn-small" onClick={reset}>Reset</button>
      </div>

      <div className="complexity-grid">
        <div className="complexity-item"><label>Push</label><span>O(1)</span></div>
        <div className="complexity-item"><label>Pop</label><span>O(1)</span></div>
        <div className="complexity-item"><label>Peek</label><span>O(1)</span></div>
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

export default StackVisualizer;
