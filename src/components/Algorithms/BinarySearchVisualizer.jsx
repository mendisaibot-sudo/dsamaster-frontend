import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,

  javascript: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`
};

const BinarySearchVisualizer = () => {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([2, 5, 8, 12, 16, 23, 38, 56, 72, 91]);
  const [target, setTarget] = useState(23);
  const [low, setLow] = useState(-1);
  const [high, setHigh] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [message, setMessage] = useState('');
  const speedRef = useRef(800);

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

      const barWidth = (width - 40) / array.length;

      array.forEach((value, index) => {
        const x = 20 + index * barWidth;
        const barHeight = 80;
        const y = (height - barHeight) / 2;

        if (found && index === mid) {
          ctx.fillStyle = '#22c55e';
        } else if (index === mid) {
          ctx.fillStyle = '#f59e0b';
        } else if (index >= low && index <= high) {
          ctx.fillStyle = '#6366f1';
        } else {
          ctx.fillStyle = '#2d2d44';
        }

        ctx.fillRect(x, y, barWidth - 4, barHeight);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toString(), x + (barWidth - 4) / 2, y + barHeight / 2);

        // Index labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px Inter';
        ctx.fillText(index.toString(), x + (barWidth - 4) / 2, y + barHeight + 15);
      });

      // Labels
      ctx.fillStyle = '#f8fafc';
      ctx.font = '14px Inter';
      if (low >= 0) ctx.fillText(`Low: ${low}`, 60, 30);
      if (high >= 0) ctx.fillText(`High: ${high}`, width / 2, 30);
      if (mid >= 0) ctx.fillText(`Mid: ${mid}`, width - 60, 30);
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [array, low, high, mid, found]);

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const binarySearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFound(false);
    setMessage('');

    let l = 0, h = array.length - 1;
    setLow(l);
    setHigh(h);
    await sleep(speedRef.current);

    while (l <= h) {
      const m = Math.floor((l + h) / 2);
      setMid(m);
      await sleep(speedRef.current);

      if (array[m] === target) {
        setFound(true);
        setMessage(`Found ${target} at index ${m}!`);
        setIsSearching(false);
        return;
      } else if (array[m] < target) {
        setMessage(`${array[m]} < ${target}, search right`);
        l = m + 1;
      } else {
        setMessage(`${array[m]} > ${target}, search left`);
        h = m - 1;
      }
      setLow(l);
      setHigh(h);
      await sleep(speedRef.current);
    }

    setMessage(`${target} not found in array`);
    setMid(-1);
    setIsSearching(false);
  };

  const reset = () => {
    setLow(-1);
    setHigh(-1);
    setMid(-1);
    setFound(false);
    setMessage('');
    setIsSearching(false);
  };

  return (
    <div className="search-visualizer">
      <div className="search-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '200px' }} />
      </div>

      <div className="sort-controls">
        <div className="target-input">
          <label>Target:</label>
          <input type="number" value={target} onChange={(e) => setTarget(parseInt(e.target.value) || 0)} disabled={isSearching} />
        </div>
        <button className="btn btn-primary btn-small" onClick={binarySearch} disabled={isSearching}>Search</button>
        <button className="btn btn-small" onClick={reset} disabled={isSearching}>Reset</button>
      </div>

      {message && (
        <div style={{ textAlign: 'center', padding: '0.5rem', background: found ? 'rgba(34, 197, 94, 0.2)' : 'var(--bg-secondary)', borderRadius: 'var(--radius)', color: found ? '#22c55e' : 'var(--text-primary)' }}>
          {message}
        </div>
      )}

      <div className="complexity-grid">
        <div className="complexity-item"><label>Best</label><span>O(1)</span></div>
        <div className="complexity-item"><label>Average</label><span>O(log n)</span></div>
        <div className="complexity-item"><label>Worst</label><span>O(log n)</span></div>
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

export default BinarySearchVisualizer;
