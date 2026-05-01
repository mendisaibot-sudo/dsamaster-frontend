import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,

  javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,

  java: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,

  cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
};

const BubbleSortVisualizer = () => {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [isSorting, setIsSorting] = useState(false);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sortedIndex, setSortedIndex] = useState(-1);
  const speedRef = useRef(100);

  // Initialize array
  useEffect(() => {
    generateArray();
  }, []);

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

      if (array.length === 0) return;

      const barWidth = (width - 40) / array.length;
      const maxVal = Math.max(...array);

      array.forEach((value, index) => {
        const barHeight = (value / maxVal) * (height - 80);
        const x = 20 + index * barWidth;
        const y = height - barHeight - 40;

        // Determine color
        if (index > sortedIndex && sortedIndex !== -1) {
          ctx.fillStyle = '#22c55e'; // Sorted
        } else if (index === comparing[0] || index === comparing[1]) {
          ctx.fillStyle = '#f59e0b'; // Comparing
        } else if (index === comparing[2]) {
          ctx.fillStyle = '#ef4444'; // Swapping
        } else {
          ctx.fillStyle = '#6366f1'; // Default
        }

        ctx.fillRect(x, y, barWidth - 2, barHeight);

        // Value text
        ctx.fillStyle = '#f8fafc';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      });
    };

    draw();
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [array, comparing, sortedIndex]);

  const generateArray = () => {
    const newArray = Array.from({ length: 12 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArray);
    setComparing([-1, -1]);
    setSortedIndex(-1);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const bubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(speedRef.current);

        if (arr[j] > arr[j + 1]) {
          setComparing([j, j + 1, 1]);
          await sleep(speedRef.current);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          swapped = true;
        }
        await sleep(speedRef.current);
      }
      setSortedIndex(n - i - 1);
      if (!swapped) break;
    }
    setComparing([-1, -1]);
    setSortedIndex(-1);
    setIsSorting(false);
  };

  return (
    <div className="sort-visualizer">
      <div className="sort-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="sort-controls">
        <button className="btn btn-primary btn-small" onClick={bubbleSort} disabled={isSorting}>
          Sort
        </button>
        <button className="btn btn-secondary btn-small" onClick={generateArray} disabled={isSorting}>
          New Array
        </button>
        <div className="speed-control">
          <span>Speed:</span>
          <input
            type="range"
            min="20"
            max="300"
            value={320 - speedRef.current}
            onChange={(e) => { speedRef.current = 320 - e.target.value; }}
            disabled={isSorting}
          />
        </div>
      </div>

      <div className="complexity-grid">
        <div className="complexity-item"><label>Best</label><span>O(n)</span></div>
        <div className="complexity-item"><label>Average</label><span>O(n²)</span></div>
        <div className="complexity-item"><label>Worst</label><span>O(n²)</span></div>
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

export default BubbleSortVisualizer;
