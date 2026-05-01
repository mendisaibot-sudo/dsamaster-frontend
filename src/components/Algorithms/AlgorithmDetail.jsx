import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { sortingAlgorithms, searchingAlgorithms } from '../../data/algorithms';
import { useProgress } from '../../contexts/ProgressContext';
import './AlgorithmDetail.css';

const codeSnippets = {
  bubblesort: {
    js: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
  },
  quicksort: {
    js: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
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
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
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
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`
  },
  mergesort: {
    js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
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
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    cpp: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`
  },
  heapsort: {
    js: `function heapSort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i, left = 2 * i + 1, right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    left, right = 2 * i + 1, 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    cpp: `void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
  },
  binarysearch: {
    js: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
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
    cpp: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
  },
  linearsearch: {
    js: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    cpp: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`
  },
  bfs: {
    js: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  while (queue.length) {
    const node = queue.shift();
    console.log(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
    python: `def bfs(graph, start):
    queue = [start]
    visited = {start}
    while queue:
        node = queue.pop(0)
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
    cpp: `void bfs(vector<vector<int>>& graph, int start) {
    queue<int> q;
    unordered_set<int> visited;
    q.push(start);
    visited.insert(start);
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int neighbor : graph[node]) {
            if (!visited.count(neighbor)) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`
  },
  dfs: {
    js: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`,
    python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`,
    cpp: `void dfs(vector<vector<int>>& graph, int start, unordered_set<int>& visited) {
    visited.insert(start);
    cout << start << " ";
    for (int neighbor : graph[start]) {
        if (!visited.count(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}`
  }
};

const pseudoCodes = {
  bubblesort: [
    "BEGIN BubbleSort(Arr, n)",
    "  FOR i = 0 TO n-2",
    "    FOR j = 0 TO n-i-2",
    "      IF Arr[j] > Arr[j+1]",
    "        SWAP Arr[j], Arr[j+1]",
    "      END IF",
    "    END FOR",
    "  END FOR",
    "END BubbleSort"
  ],
  quicksort: [
    "BEGIN QuickSort(Arr, low, high)",
    "  IF low < high",
    "    pi = Partition(Arr, low, high)",
    "    QuickSort(Arr, low, pi-1)",
    "    QuickSort(Arr, pi+1, high)",
    "  END IF",
    "END QuickSort"
  ],
  mergesort: [
    "BEGIN MergeSort(Arr, left, right)",
    "  IF left < right",
    "    mid = (left + right) // 2",
    "    MergeSort(Arr, left, mid)",
    "    MergeSort(Arr, mid+1, right)",
    "    Merge(Arr, left, mid, right)",
    "  END IF",
    "END MergeSort"
  ],
  heapsort: [
    "BEGIN HeapSort(Arr, n)",
    "  FOR i = n//2 - 1 DOWNTO 0",
    "    Heapify(Arr, n, i)",
    "  END FOR",
    "  FOR i = n-1 DOWNTO 1",
    "    SWAP Arr[0], Arr[i]",
    "    Heapify(Arr, i, 0)",
    "  END FOR",
    "END HeapSort"
  ],
  binarysearch: [
    "BEGIN BinarySearch(Arr, target)",
    "  left = 0, right = LENGTH(Arr) - 1",
    "  WHILE left <= right",
    "    mid = (left + right) // 2",
    "    IF Arr[mid] == target",
    "      RETURN mid",
    "    ELSE IF Arr[mid] < target",
    "      left = mid + 1",
    "    ELSE",
    "      right = mid - 1",
    "    END IF",
    "  END WHILE",
    "  RETURN -1",
    "END BinarySearch"
  ],
  linearsearch: [
    "BEGIN LinearSearch(Arr, target)",
    "  FOR i = 0 TO LENGTH(Arr)-1",
    "    IF Arr[i] == target",
    "      RETURN i",
    "    END IF",
    "  END FOR",
    "  RETURN -1",
    "END LinearSearch"
  ],
  bfs: [
    "BEGIN BFS(graph, start)",
    "  queue = [start]",
    "  visited = {start}",
    "  WHILE queue NOT empty",
    "    node = DEQUEUE(queue)",
    "    PROCESS(node)",
    "    FOR each neighbor IN graph[node]",
    "      IF neighbor NOT IN visited",
    "        visited.ADD(neighbor)",
    "        ENQUEUE(queue, neighbor)",
    "      END IF",
    "    END FOR",
    "  END WHILE",
    "END BFS"
  ],
  dfs: [
    "BEGIN DFS(graph, start)",
    "  visited = {}",
    "  STACK = [start]",
    "  WHILE STACK NOT empty",
    "    node = POP(STACK)",
    "    IF node NOT IN visited",
    "      visited.ADD(node)",
    "      PROCESS(node)",
    "      FOR each neighbor IN graph[node]",
    "        PUSH(STACK, neighbor)",
    "      END FOR",
    "    END IF",
    "  END WHILE",
    "END DFS"
  ]
};

export default function AlgorithmDetail() {
  const { algorithmId } = useParams();
  const [algo, setAlgo] = useState(null);
  const [tab, setTab] = useState('overview');
  const [lang, setLang] = useState('js');
  const [customArr, setCustomArr] = useState([]);
  const [arrSize, setArrSize] = useState(10);
  const [arrType, setArrType] = useState('random');
  const [highlightLine, setHighlightLine] = useState(-1);
  const [searchVal, setSearchVal] = useState("");
  const canvasRef = useRef(null);
  const speedRef = useRef(100);
  const [isSort, setIsSort] = useState(false);
  const [comp, setComp] = useState([-1,-1]);
  const [graphState, setGraphState] = useState(null);
  const [activeRange, setActiveRange] = useState([-1, -1]);
  const [searchResult, setSearchResult] = useState(null);
  const { addTopic } = useProgress();

  useEffect(() => {
    const all = [...sortingAlgorithms, ...searchingAlgorithms];
    const found = all.find(a => a.id === algorithmId);
    if (found) { setAlgo(found); addTopic(found.name); }
  }, [algorithmId, addTopic]);

  useEffect(() => {
    genArray();
  }, [arrSize, arrType, algo]);

  useEffect(() => {
    if (algo && (algo.id === 'bfs' || algo.id === 'dfs')) {
      drawGraph();
    } else {
      drawBars();
    }
  }, [customArr, comp, graphState, algo, activeRange]);

  function genArray() {
    let arr = [];
    const size = Math.max(5, Math.min(30, arrSize));
    switch (arrType) {
      case 'sorted':
        arr = Array.from({ length: size }, (_, i) => i + 1);
        break;
      case 'reverse':
        arr = Array.from({ length: size }, (_, i) => size - i);
        break;
      case 'duplicate':
        arr = Array.from({ length: size }, () => Math.floor(Math.random() * 10) + 1);
        break;
      default:
        arr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    }
    setCustomArr(arr);
    setComp([-1, -1]);
    setGraphState(null);
    setActiveRange([-1, -1]);
    setSearchResult(null);
  }

  function drawBars() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;

    ctx.fillStyle = '#0f0e1c';
    ctx.fillRect(0, 0, w, h);

    if (!customArr.length) return;
    const bw = (w - 40) / customArr.length;
    const mv = Math.max(...customArr);
    const isSearch = algo && (algo.id === 'binarysearch' || algo.id === 'linearsearch');
    const rangeActive = isSearch && activeRange[0] !== -1 && activeRange[1] !== -1;

    // Draw range brackets for active search range
    if (rangeActive) {
      const [l, r] = activeRange;
      const lx = 20 + l * bw;
      const rx = 20 + (r + 1) * bw - 2;
      const bracketH = 12;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      // Left bracket
      ctx.beginPath();
      ctx.moveTo(lx, h - 20);
      ctx.lineTo(lx, h - 20 - bracketH);
      ctx.lineTo(lx + 6, h - 20 - bracketH);
      ctx.stroke();
      // Right bracket
      ctx.beginPath();
      ctx.moveTo(rx, h - 20);
      ctx.lineTo(rx, h - 20 - bracketH);
      ctx.lineTo(rx - 6, h - 20 - bracketH);
      ctx.stroke();
      // Range label
      ctx.fillStyle = '#f59e0b';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`active [${l}..${r}]`, (lx + rx) / 2, h - 8);
    }

    customArr.forEach((v, i) => {
      const bh = (v / mv) * (h - 80);
      const x = 20 + i * bw;
      const y = h - bh - 40;
      if (i === comp[0] || i === comp[1]) ctx.fillStyle = '#f59e0b';
      else if (rangeActive && (i < activeRange[0] || i > activeRange[1])) ctx.fillStyle = '#374151';
      else ctx.fillStyle = '#6366f1';
      ctx.fillRect(x, y, bw - 2, bh);
      ctx.fillStyle = '#fff';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(v.toString(), x + bw / 2, y - 5);
    });
  }

  function buildGraphFromArray(arr) {
    const n = arr.length;
    const adj = Array.from({ length: n }, () => new Set());
    for (let i = 0; i < n - 1; i++) {
      adj[i].add(i + 1);
      adj[i + 1].add(i);
    }
    for (let i = 0; i < n; i++) {
      if (n > 3) {
        const j = Math.floor(Math.random() * n);
        if (j !== i && !adj[i].has(j)) {
          adj[i].add(j);
          adj[j].add(i);
        }
      }
    }
    return adj.map(s => Array.from(s));
  }

  function getGraphPositions(n, w, h) {
    const margin = 40;
    const positions = [];
    const cx = w / 2, cy = h / 2;
    const radius = Math.min(w, h) / 2 - margin;
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      positions.push({ x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) });
    }
    return positions;
  }

  function drawGraph() {
    const c = canvasRef.current;
    if (!c || !algo) return;
    const ctx = c.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;

    ctx.fillStyle = '#0f0e1c';
    ctx.fillRect(0, 0, w, h);

    const n = customArr.length || 8;
    const graph = buildGraphFromArray(Array.from({ length: n }, (_, i) => i));
    const positions = getGraphPositions(n, w, h);

    const visited = (graphState && graphState.visited) ? graphState.visited : new Set();
    const current = (graphState && graphState.current != null) ? graphState.current : -1;

    ctx.lineWidth = 2;
    for (let u = 0; u < n; u++) {
      for (const v of graph[u]) {
        if (v <= u) continue;
        ctx.strokeStyle = '#2d2b52';
        ctx.beginPath();
        ctx.moveTo(positions[u].x, positions[u].y);
        ctx.lineTo(positions[v].x, positions[v].y);
        ctx.stroke();
      }
    }

    if (graphState && graphState.edge) {
      const [eu, ev] = graphState.edge;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(positions[eu].x, positions[eu].y);
      ctx.lineTo(positions[ev].x, positions[ev].y);
      ctx.stroke();
    }

    const radius = Math.max(12, Math.min(w, h) / (n * 2.5));
    for (let i = 0; i < n; i++) {
      const { x, y } = positions[i];
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      if (i === current) ctx.fillStyle = '#f59e0b';
      else if (visited.has(i)) ctx.fillStyle = '#10b981';
      else ctx.fillStyle = '#6366f1';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = `${Math.max(10, Math.floor(radius))}px Inter`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i), x, y);
    }

    if (graphState && graphState.msg) {
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(graphState.msg, w / 2, h - 20);
    }
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function runBubbleSort() {
    if (isSort) return;
    setIsSort(true);
    const arr = [...customArr];
    const n = arr.length;
    setHighlightLine(0);
    for (let i = 0; i < n - 1; i++) {
      setHighlightLine(1);
      for (let j = 0; j < n - i - 1; j++) {
        setHighlightLine(2);
        setComp([j, j + 1]);
        await sleep(speedRef.current);
        setHighlightLine(3);
        await sleep(speedRef.current);
        if (arr[j] > arr[j + 1]) {
          setHighlightLine(4);
          let t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;
          setCustomArr([...arr]);
          await sleep(speedRef.current);
        }
      }
    }
    setHighlightLine(-1);
    setComp([-1, -1]);
    setIsSort(false);
  }

  async function runQuickSort() {
    if (isSort) return;
    setIsSort(true);
    const arr = [...customArr];

    async function partition(low, high) {
      setHighlightLine(2);
      setComp([high, -1]);
      await sleep(speedRef.current);
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        setHighlightLine(3);
        setComp([j, high]);
        await sleep(speedRef.current);
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setCustomArr([...arr]);
          await sleep(speedRef.current);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setCustomArr([...arr]);
      setComp([i + 1, -1]);
      await sleep(speedRef.current);
      return i + 1;
    }

    async function quickSort(low, high) {
      setHighlightLine(0);
      await sleep(speedRef.current);
      if (low < high) {
        const pi = await partition(low, high);
        setHighlightLine(3);
        await quickSort(low, pi - 1);
        setHighlightLine(4);
        await quickSort(pi + 1, high);
      }
    }

    await quickSort(0, arr.length - 1);
    setHighlightLine(-1);
    setComp([-1, -1]);
    setIsSort(false);
  }

  async function runMergeSort() {
    if (isSort) return;
    setIsSort(true);
    let arr = [...customArr];

    async function mergeSort(l, r) {
      setHighlightLine(0);
      await sleep(speedRef.current);
      if (l < r) {
        setHighlightLine(2);
        const m = Math.floor((l + r) / 2);
        await sleep(speedRef.current);
        setHighlightLine(3);
        await mergeSort(l, m);
        setHighlightLine(4);
        await mergeSort(m + 1, r);
        setHighlightLine(5);
        await merge(l, m, r);
      }
    }

    async function merge(l, m, r) {
      const n1 = m - l + 1;
      const n2 = r - m;
      const L = arr.slice(l, m + 1);
      const R = arr.slice(m + 1, r + 1);
      let i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
        setComp([l + i, m + 1 + j]);
        await sleep(speedRef.current);
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        setCustomArr([...arr]);
        await sleep(speedRef.current);
        k++;
      }
      while (i < n1) {
        arr[k] = L[i];
        i++; k++;
        setCustomArr([...arr]);
        await sleep(speedRef.current);
      }
      while (j < n2) {
        arr[k] = R[j];
        j++; k++;
        setCustomArr([...arr]);
        await sleep(speedRef.current);
      }
    }

    await mergeSort(0, arr.length - 1);
    setHighlightLine(-1);
    setComp([-1, -1]);
    setIsSort(false);
  }

  async function runHeapSort() {
    if (isSort) return;
    setIsSort(true);
    const arr = [...customArr];
    const n = arr.length;

    async function heapify(N, i) {
      setHighlightLine(2);
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      setComp([i, l < N ? l : -1]);
      await sleep(speedRef.current);
      if (l < N && arr[l] > arr[largest]) largest = l;
      setComp([largest, r < N ? r : -1]);
      await sleep(speedRef.current);
      if (r < N && arr[r] > arr[largest]) largest = r;
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setCustomArr([...arr]);
        await sleep(speedRef.current);
        await heapify(N, largest);
      }
    }

    setHighlightLine(0);
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      setHighlightLine(1);
      await heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
      setHighlightLine(4);
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setCustomArr([...arr]);
      await sleep(speedRef.current);
      setHighlightLine(6);
      await heapify(i, 0);
    }
    setHighlightLine(-1);
    setComp([-1, -1]);
    setIsSort(false);
  }

  async function runLinearSearch() {
    if (isSort) return;
    setIsSort(true);
    setActiveRange([-1, -1]);
    setSearchResult(null);
    const arr = [...customArr];
    const target = searchVal ? parseInt(searchVal) : arr[Math.floor(Math.random() * arr.length)];
    let found = false;
    for (let i = 0; i < arr.length; i++) {
      setComp([i, -1]);
      setActiveRange([i, arr.length - 1]);
      setHighlightLine(1);
      await sleep(speedRef.current);
      setHighlightLine(2);
      await sleep(speedRef.current);
      if (arr[i] === target) {
        setHighlightLine(3);
        await sleep(500);
        found = true;
        break;
      }
      setHighlightLine(5);
    }
    if (!found) {
      setHighlightLine(5);
      await sleep(500);
    }
    setSearchResult({ value: target, found });
    setHighlightLine(-1);
    setComp([-1, -1]);
    setActiveRange([-1, -1]);
    setIsSort(false);
  }

  async function runBinarySearch() {
    if (isSort) return;
    setIsSort(true);
    setActiveRange([-1, -1]);
    setSearchResult(null);
    const arr = [...customArr].sort((a,b) => a-b);
    setCustomArr(arr);
    await sleep(300);
    const target = searchVal ? parseInt(searchVal) : arr[Math.floor(Math.random() * arr.length)];
    let left = 0, right = arr.length - 1;
    let found = false;
    setActiveRange([left, right]);
    await sleep(speedRef.current);
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setComp([mid, -1]);
      setHighlightLine(3);
      await sleep(speedRef.current * 1.5);
      if (arr[mid] === target) {
        setHighlightLine(5);
        await sleep(500);
        found = true;
        break;
      } else if (arr[mid] < target) {
        setHighlightLine(7);
        left = mid + 1;
      } else {
        setHighlightLine(9);
        right = mid - 1;
      }
      setActiveRange([left, right]);
      await sleep(speedRef.current);
      setHighlightLine(2);
    }
    if (!found) {
      setHighlightLine(12);
      await sleep(500);
    }
    setSearchResult({ value: target, found });
    setHighlightLine(-1);
    setComp([-1, -1]);
    setActiveRange([-1, -1]);
    setIsSort(false);
  }

  async function runBFS() {
    if (isSort) return;
    setIsSort(true);
    const n = Math.max(5, customArr.length);
    const graph = buildGraphFromArray(Array.from({ length: n }, (_, i) => i));
    const start = 0;
    const queue = [start];
    const visited = new Set([start]);

    setGraphState({ visited: new Set(visited), current: start, edge: null, msg: `Start at node ${start}` });
    setHighlightLine(0);
    await sleep(speedRef.current * 2);

    setHighlightLine(1);
    setHighlightLine(2);
    await sleep(speedRef.current);

    setHighlightLine(3);
    while (queue.length) {
      const node = queue.shift();
      setGraphState({ visited: new Set(visited), current: node, edge: null, msg: `Processing node ${node}` });
      setHighlightLine(4);
      await sleep(speedRef.current * 1.5);
      setHighlightLine(5);
      await sleep(speedRef.current);

      for (const neighbor of graph[node]) {
        setHighlightLine(6);
        setGraphState({ visited: new Set(visited), current: node, edge: [node, neighbor], msg: `Checking neighbor ${neighbor}` });
        await sleep(speedRef.current);
        setHighlightLine(7);
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          setHighlightLine(8);
          setHighlightLine(9);
          setGraphState({ visited: new Set(visited), current: neighbor, edge: [node, neighbor], msg: `Visited node ${neighbor}` });
          await sleep(speedRef.current * 1.5);
        }
      }
      setHighlightLine(3);
    }
    setGraphState({ visited: new Set(visited), current: -1, edge: null, msg: 'BFS complete' });
    setHighlightLine(-1);
    setIsSort(false);
  }

  async function runDFS() {
    if (isSort) return;
    setIsSort(true);
    const n = Math.max(5, customArr.length);
    const graph = buildGraphFromArray(Array.from({ length: n }, (_, i) => i));
    const start = 0;
    const stack = [start];
    const visited = new Set();

    setGraphState({ visited: new Set(visited), current: -1, edge: null, msg: `Start DFS from node ${start}` });
    setHighlightLine(0);
    await sleep(speedRef.current * 2);
    setHighlightLine(1);
    setHighlightLine(2);
    await sleep(speedRef.current);

    setHighlightLine(3);
    while (stack.length) {
      const node = stack.pop();
      setHighlightLine(4);
      setGraphState({ visited: new Set(visited), current: node, edge: null, msg: `Popped node ${node}` });
      await sleep(speedRef.current * 1.5);

      setHighlightLine(5);
      if (!visited.has(node)) {
        visited.add(node);
        setHighlightLine(6);
        setHighlightLine(7);
        setGraphState({ visited: new Set(visited), current: node, edge: null, msg: `Visiting node ${node}` });
        await sleep(speedRef.current * 1.5);

        setHighlightLine(8);
        for (const neighbor of graph[node]) {
          setHighlightLine(9);
          setGraphState({ visited: new Set(visited), current: node, edge: [node, neighbor], msg: `Pushing neighbor ${neighbor}` });
          await sleep(speedRef.current);
          stack.push(neighbor);
        }
      }
      setHighlightLine(3);
    }
    setGraphState({ visited: new Set(visited), current: -1, edge: null, msg: 'DFS complete' });
    setHighlightLine(-1);
    setIsSort(false);
  }

  function runVisual() {
    if (!algo) return;
    switch (algo.id) {
      case 'bubblesort': return runBubbleSort();
      case 'quicksort': return runQuickSort();
      case 'mergesort': return runMergeSort();
      case 'heapsort': return runHeapSort();
      case 'linearsearch': return runLinearSearch();
      case 'binarysearch': return runBinarySearch();
      case 'bfs': return runBFS();
      case 'dfs': return runDFS();
      default: return;
    }
  }

  if (!algo) return <div className="detail-page"><div className="container"><h2>Not found</h2></div></div>;

  const code = codeSnippets[algo.id];
  const pseudo = pseudoCodes[algo.id] || [];

  return (
    <div className="detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => window.history.back()}>Back</button>
        <h1>{algo.name}</h1>
        <p className="detail-desc">{algo.details || algo.description}</p>

        <div className="detail-grid">
          <div className="detail-sidebar">
            <div className="panel">
              <h3>Complexity</h3>
              <div className="stat-row"><span>Time</span><span className="badge">{algo.complexity}</span></div>
              <div className="stat-row"><span>Best</span><span>{algo.bestCase || 'O(n)'}</span></div>
              <div className="stat-row"><span>Worst</span><span>{algo.worstCase || algo.complexity}</span></div>
            </div>

            <div className="panel">
              <h3>Array Generator</h3>
              {(algo.id === 'linearsearch' || algo.id === 'binarysearch') && (
                <>
                  <label>Search Value</label>
                  <input type="number" value={searchVal} onChange={e => setSearchVal(e.target.value)} disabled={isSort} placeholder="Enter a number" />
                </>
              )}
              <label>Size: {arrSize}</label>
              <input type="range" min="5" max="30" value={arrSize} onChange={e => setArrSize(parseInt(e.target.value))} disabled={isSort} />
              <label>Type</label>
              <select value={arrType} onChange={e => setArrType(e.target.value)} disabled={isSort}>
                <option value="random">Random</option>
                <option value="sorted">Sorted</option>
                <option value="reverse">Reverse</option>
                <option value="duplicate">Duplicates</option>
              </select>
              <button className="btn" onClick={genArray} disabled={isSort}>Generate</button>
              <div className="arr-preview">[{customArr.join(', ')}]</div>
            </div>
          </div>

          <div className="detail-main">
            <div className="tabs">
              <button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}>Overview</button>
              <button className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>Code</button>
            </div>

            {tab === 'overview' && (
              <div className="tab-panel">
                <h3>{algo.name} Visualization</h3>
                <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', background: '#0f0e1c' }}>
                  <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="controls-row">
                  <button className="btn btn-primary" onClick={runVisual} disabled={isSort}>Run {algo.name}</button>
                  <button className="btn" onClick={genArray} disabled={isSort}>New Array</button>
                  <label>Speed</label>
                  <input type="range" min="20" max="300" defaultValue="150" onChange={e => speedRef.current = 320 - e.target.value} disabled={isSort} />
                </div>
                {(algo.id === 'linearsearch' || algo.id === 'binarysearch') && searchResult && (
                  <div className="search-result-msg">
                    <span className={searchResult.found ? 'found-badge' : 'notfound-badge'}>
                      {searchResult.value} {searchResult.found ? 'found' : 'not found'}
                    </span>
                  </div>
                )}

                <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Pseudocode – Step by Step</h4>
                <div className="pseudo-block" style={{ fontSize: '0.8rem' }}>
                  {pseudo.map((line, idx) => (
                    <div key={idx} className={highlightLine === idx ? 'pseudo-line highlight' : 'pseudo-line'}>
                      <span className="line-num">{idx + 1}</span>
                      <span className="line-txt">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'code' && (
              <div className="tab-panel">
                <div className="lang-tabs">
                  <button className={lang === 'js' ? 'active' : ''} onClick={() => setLang('js')}>JavaScript</button>
                  <button className={lang === 'python' ? 'active' : ''} onClick={() => setLang('python')}>Python</button>
                  <button className={lang === 'cpp' ? 'active' : ''} onClick={() => setLang('cpp')}>C++</button>
                </div>
                <pre className="code-block">{code ? code[lang] : ''}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
