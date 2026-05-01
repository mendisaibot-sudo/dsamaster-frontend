import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr`,

  javascript: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`
};

const HeapSortVisualizer = () => {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const speedRef = useRef(200);

  useEffect(() => { generateArray(); }, []);

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

        ctx.fillStyle = index === activeIndex ? '#f59e0b' : '#6366f1';
        ctx.fillRect(x, y, barWidth - 2, barHeight);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      });
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [array, activeIndex]);

  const generateArray = () => {
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10));
    setActiveIndex(-1);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const heapSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    let arr = [...array];
    const n = arr.length;

    const heapify = async (size, root) => {
      let largest = root;
      const left = 2 * root + 1;
      const right = 2 * root + 2;

      setActiveIndex(root);
      await sleep(speedRef.current);

      if (left < size && arr[left] > arr[largest]) largest = left;
      if (right < size && arr[right] > arr[largest]) largest = right;

      if (largest !== root) {
        [arr[root], arr[largest]] = [arr[largest], arr[root]];
        setArray([...arr]);
        await sleep(speedRef.current);
        await heapify(size, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      await sleep(speedRef.current);
      await heapify(i, 0);
    }

    setActiveIndex(-1);
    setIsSorting(false);
  };

  return (
    <div className="sort-visualizer">
      <div className="sort-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="sort-controls">
        <button className="btn btn-primary btn-small" onClick={heapSort} disabled={isSorting}>Sort</button>
        <button className="btn btn-secondary btn-small" onClick={generateArray} disabled={isSorting}>New Array</button>
      </div>
      <div className="complexity-grid">
        <div className="complexity-item"><label>All Cases</label><span>O(n log n)</span></div>
        <div className="complexity-item"><label>Space</label><span>O(1)</span></div>
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

export default HeapSortVisualizer;
