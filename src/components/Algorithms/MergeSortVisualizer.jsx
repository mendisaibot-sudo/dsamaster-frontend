import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,

  javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i), right.slice(j));
}`
};

const MergeSortVisualizer = () => {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [isSorting, setIsSorting] = useState(false);
  const [activeRange, setActiveRange] = useState([-1, -1]);
  const speedRef = useRef(150);

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

        if (index >= activeRange[0] && index <= activeRange[1]) {
          ctx.fillStyle = '#f59e0b';
        } else {
          ctx.fillStyle = '#6366f1';
        }

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
  }, [array, activeRange]);

  const generateArray = () => {
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10));
    setActiveRange([-1, -1]);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const mergeSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    let arr = [...array];

    const merge = async (left, right, startIdx) => {
      const result = [];
      let i = 0, j = 0;
      setActiveRange([startIdx, startIdx + left.length + right.length - 1]);
      await sleep(speedRef.current);

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      const merged = result.concat(left.slice(i), right.slice(j));

      for (let k = 0; k < merged.length; k++) {
        arr[startIdx + k] = merged[k];
        setArray([...arr]);
        await sleep(speedRef.current / 2);
      }

      return merged;
    };

    const sort = async (arrSlice, startIdx) => {
      if (arrSlice.length <= 1) return arrSlice;
      const mid = Math.floor(arrSlice.length / 2);
      const left = await sort(arrSlice.slice(0, mid), startIdx);
      const right = await sort(arrSlice.slice(mid), startIdx + mid);
      return await merge(left, right, startIdx);
    };

    await sort(arr, 0);
    setActiveRange([-1, -1]);
    setIsSorting(false);
  };

  return (
    <div className="sort-visualizer">
      <div className="sort-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="sort-controls">
        <button className="btn btn-primary btn-small" onClick={mergeSort} disabled={isSorting}>Sort</button>
        <button className="btn btn-secondary btn-small" onClick={generateArray} disabled={isSorting}>New Array</button>
      </div>
      <div className="complexity-grid">
        <div className="complexity-item"><label>All Cases</label><span>O(n log n)</span></div>
        <div className="complexity-item"><label>Space</label><span>O(n)</span></div>
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

export default MergeSortVisualizer;
