import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,

  javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,

  java: `void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,

  cpp: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`
};

const QuickSortVisualizer = () => {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [isSorting, setIsSorting] = useState(false);
  const [comparing, setComparing] = useState([-1, -1]);
  const [pivotIndex, setPivotIndex] = useState(-1);
  const speedRef = useRef(200);

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

        if (index === pivotIndex) {
          ctx.fillStyle = '#ef4444';
        } else if (index === comparing[0] || index === comparing[1]) {
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
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [array, comparing, pivotIndex]);

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArray);
    setComparing([-1, -1]);
    setPivotIndex(-1);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const quickSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arr = [...array];

    const partition = async (low, high) => {
      setPivotIndex(high);
      await sleep(speedRef.current * 2);

      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        setComparing([j, high]);
        await sleep(speedRef.current);

        if (arr[j] <= pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          await sleep(speedRef.current);
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      setPivotIndex(-1);
      setComparing([-1, -1]);
      return i + 1;
    };

    const sort = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    };

    await sort(0, arr.length - 1);
    setIsSorting(false);
  };

  return (
    <div className="sort-visualizer">
      <div className="sort-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="sort-controls">
        <button className="btn btn-primary btn-small" onClick={quickSort} disabled={isSorting}>Sort</button>
        <button className="btn btn-secondary btn-small" onClick={generateArray} disabled={isSorting}>New Array</button>
        <div className="speed-control">
          <span>Speed:</span>
          <input type="range" min="20" max="300" value={320 - speedRef.current} onChange={(e) => speedRef.current = 320 - e.target.value} disabled={isSorting} />
        </div>
      </div>

      <div className="complexity-grid">
        <div className="complexity-item"><label>Best</label><span>O(n log n)</span></div>
        <div className="complexity-item"><label>Average</label><span>O(n log n)</span></div>
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

export default QuickSortVisualizer;
