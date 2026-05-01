import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,

  javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`
};

const LinearSearchVisualizer = () => {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([45, 12, 78, 23, 67, 89, 34, 56]);
  const [target, setTarget] = useState(67);
  const [current, setCurrent] = useState(-1);
  const [found, setFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [message, setMessage] = useState('');
  const speedRef = useRef(600);

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

        if (found && index === current) {
          ctx.fillStyle = '#22c55e';
        } else if (index === current) {
          ctx.fillStyle = '#f59e0b';
        } else if (index < current) {
          ctx.fillStyle = '#2d2d44';
        } else {
          ctx.fillStyle = '#6366f1';
        }

        ctx.fillRect(x, y, barWidth - 4, barHeight);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toString(), x + (barWidth - 4) / 2, y + barHeight / 2);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px Inter';
        ctx.fillText(index.toString(), x + (barWidth - 4) / 2, y + barHeight + 15);
      });
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [array, current, found]);

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const linearSearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFound(false);
    setCurrent(-1);
    setMessage('');

    for (let i = 0; i < array.length; i++) {
      setCurrent(i);
      await sleep(speedRef.current);

      if (array[i] === target) {
        setFound(true);
        setMessage(`Found ${target} at index ${i}!`);
        setIsSearching(false);
        return;
      }
    }

    setMessage(`${target} not found in array`);
    setIsSearching(false);
  };

  const reset = () => {
    setCurrent(-1);
    setFound(false);
    setMessage('');
    setArray([45, 12, 78, 23, 67, 89, 34, 56]);
  };

  const randomize = () => {
    setArray(Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10));
    setCurrent(-1);
    setFound(false);
    setMessage('');
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
        <button className="btn btn-primary btn-small" onClick={linearSearch} disabled={isSearching}>Search</button>
        <button className="btn btn-secondary btn-small" onClick={randomize} disabled={isSearching}>Randomize</button>
        <button className="btn btn-small" onClick={reset} disabled={isSearching}>Reset</button>
      </div>

      {message && (
        <div style={{ textAlign: 'center', padding: '0.5rem', background: found ? 'rgba(34, 197, 94, 0.2)' : 'var(--bg-secondary)', borderRadius: 'var(--radius)', color: found ? '#22c55e' : 'var(--text-primary)' }}>
          {message}
        </div>
      )}

      <div className="complexity-grid">
        <div className="complexity-item"><label>Best</label><span>O(1)</span></div>
        <div className="complexity-item"><label>Average</label><span>O(n)</span></div>
        <div className="complexity-item"><label>Worst</label><span>O(n)</span></div>
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

export default LinearSearchVisualizer;
