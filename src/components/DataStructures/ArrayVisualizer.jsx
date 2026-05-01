import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `arr = [1, 2, 3, 4, 5]

# Access - O(1)
element = arr[2]  # 3

# Insert at end - O(1) amortized
arr.append(6)

# Insert at index - O(n)
arr.insert(2, 10)

# Delete - O(n)
arr.pop(2)

# Search - O(n)
index = arr.index(4)`,

  javascript: `const arr = [1, 2, 3, 4, 5];

// Access - O(1)
const element = arr[2];  // 3

// Insert at end - O(1) amortized
arr.push(6);

// Insert at index - O(n)
arr.splice(2, 0, 10);

// Delete - O(n)
arr.splice(2, 1);

// Search - O(n)
const index = arr.indexOf(4);`,

  java: `int[] arr = {1, 2, 3, 4, 5};
int element = arr[2];  // Access: O(1)

// ArrayList for dynamic operations
ArrayList<Integer> list = new ArrayList<>();
list.add(1);        // O(1) amortized
list.add(2, 10);    // O(n)
list.remove(2);     // O(n)`,

  cpp: `vector<int> arr = {1, 2, 3, 4, 5};
int element = arr[2];  // Access: O(1)

arr.push_back(6);                    // Insert end: O(1)
arr.insert(arr.begin() + 2, 10);    // Insert mid: O(n)
arr.erase(arr.begin() + 2);         // Delete: O(n)`
};

const ArrayVisualizer = () => {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 5]);
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

      const cellWidth = Math.min(80, (width - 100) / array.length);
      const cellHeight = 60;
      const startX = (width - array.length * cellWidth) / 2;
      const startY = height / 2 - cellHeight / 2;

      array.forEach((value, index) => {
        const x = startX + index * cellWidth;
        ctx.fillStyle = index === activeIndex ? '#6366f1' : '#16162a';
        ctx.fillRect(x, startY, cellWidth - 4, cellHeight);
        ctx.strokeStyle = index === activeIndex ? '#8b5cf6' : '#2d2d44';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, startY, cellWidth - 4, cellHeight);
        ctx.fillStyle = index === activeIndex ? '#ffffff' : '#f8fafc';
        ctx.font = 'bold 18px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toString(), x + (cellWidth - 4) / 2, startY + cellHeight / 2);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px Inter';
        ctx.fillText(index.toString(), x + (cellWidth - 4) / 2, startY + cellHeight + 20);
      });
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [array, activeIndex]);

  const animateAccess = (index) => {
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(-1), 800);
  };

  const handleInsert = () => {
    const value = Math.floor(Math.random() * 100);
    const index = Math.floor(Math.random() * (array.length + 1));
    const newArray = [...array];
    newArray.splice(index, 0, value);
    setArray(newArray.slice(0, 12));
  };

  const handleDelete = () => {
    if (array.length <= 3) return;
    const index = Math.floor(Math.random() * array.length);
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  return (
    <div className="visualizer-wrapper">
      <div className="visualizer-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '300px' }} />
      </div>
      <div className="visualizer-controls">
        <button className="btn btn-primary btn-small" onClick={() => animateAccess(3)}>Access Index 3</button>
        <button className="btn btn-secondary btn-small" onClick={handleInsert}>Insert</button>
        <button className="btn btn-secondary btn-small" onClick={handleDelete}>Delete</button>
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

export default ArrayVisualizer;
