import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { dataStructures, dsComplexity } from '../../data/dataStructures';
import { dsOperations } from '../../data/dsOperations';
import { useProgress } from '../../contexts/ProgressContext';
import './DataStructureDetail.css';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const dsCode = {
  arrays: {
    js: `class ArrayOps {
  constructor() { this.arr = []; }
  insert(val) { this.arr.push(val); }
  search(val) {
    for (let i = 0; i < this.arr.length; i++)
      if (this.arr[i] === val) return i;
    return -1;
  }
  delete(idx) { this.arr.splice(idx, 1); }
}`,
    python: `class ArrayOps:
    def __init__(self):
        self.arr = []
    def insert(self, val):
        self.arr.append(val)
    def search(self, val):
        for i, v in enumerate(self.arr):
            if v == val: return i
        return -1
    def delete(self, idx):
        self.arr.pop(idx)`,
    cpp: `#include <vector>
class ArrayOps {
    std::vector<int> arr;
public:
    void insert(int val) { arr.push_back(val); }
    int search(int val) {
        for (int i = 0; i < arr.size(); i++)
            if (arr[i] == val) return i;
        return -1;
    }
    void deleteAt(int idx) { arr.erase(arr.begin() + idx); }
};`
  },
  linkedlist: {
    js: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}
class LinkedList {
  constructor() { this.head = null; }
  insert(val) {
    const node = new Node(val);
    node.next = this.head;
    this.head = node;
  }
  delete() {
    if (this.head) this.head = this.head.next;
  }
}`,
    python: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    def insert(self, val):
        node = Node(val)
        node.next = self.head
        self.head = node
    def delete(self):
        if self.head:
            self.head = self.head.next`,
    cpp: `struct Node {
    int val; Node* next;
    Node(int v) : val(v), next(nullptr) {}
};
class LinkedList {
    Node* head;
public:
    LinkedList() : head(nullptr) {}
    void insert(int val) {
        Node* node = new Node(val);
        node->next = head; head = node;
    }
    void deleteHead() {
        if (head) { Node* t = head; head = head->next; delete t; }
    }
};`
  },
  stack: {
    js: `class Stack {
  constructor() { this.items = []; }
  push(val) { this.items.unshift(val); }
  pop() { return this.items.shift(); }
  peek() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
}`,
    python: `class Stack:
    def __init__(self):
        self.items = []
    def push(self, val):
        self.items.insert(0, val)
    def pop(self):
        return self.items.pop(0) if self.items else None
    def peek(self):
        return self.items[0] if self.items else None
    def is_empty(self):
        return len(self.items) == 0`,
    cpp: `#include <vector>
class Stack {
    std::vector<int> items;
public:
    void push(int val) { items.insert(items.begin(), val); }
    int pop() { int v = items[0]; items.erase(items.begin()); return v; }
    int peek() { return items[0]; }
    bool isEmpty() { return items.empty(); }
};`
  },
  queue: {
    js: `class Queue {
  constructor() { this.items = []; }
  enqueue(val) { this.items.push(val); }
  dequeue() { return this.items.shift(); }
  peek() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
}`,
    python: `class Queue:
    def __init__(self):
        self.items = []
    def enqueue(self, val):
        self.items.append(val)
    def dequeue(self):
        return self.items.pop(0) if self.items else None
    def peek(self):
        return self.items[0] if self.items else None
    def is_empty(self):
        return len(self.items) == 0`,
    cpp: `#include <queue>
class Queue {
    std::queue<int> q;
public:
    void enqueue(int val) { q.push(val); }
    int dequeue() { int v = q.front(); q.pop(); return v; }
    int peek() { return q.front(); }
    bool isEmpty() { return q.empty(); }
};`
  },
  bst: {
    js: `class BSTNode {
  constructor(val) { this.val = val; this.left = this.right = null; }
}
class BST {
  constructor() { this.root = null; }
  insert(val, node = this.root) {
    if (!node) return new BSTNode(val);
    if (val < node.val) node.left = this.insert(val, node.left);
    else node.right = this.insert(val, node.right);
    return node;
  }
}`,
    python: `class BSTNode:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None

class BST:
    def __init__(self):
        self.root = None
    def insert(self, val, node=None):
        if node is None: node = self.root
        if node is None: self.root = BSTNode(val); return
        if val < node.val:
            if node.left: self.insert(val, node.left)
            else: node.left = BSTNode(val)
        else:
            if node.right: self.insert(val, node.right)
            else: node.right = BSTNode(val)`,
    cpp: `struct BSTNode {
    int val; BSTNode *left, *right;
    BSTNode(int v) : val(v), left(nullptr), right(nullptr) {}
};
class BST {
    BSTNode* root;
    BSTNode* insert(BSTNode* node, int val) {
        if (!node) return new BSTNode(val);
        if (val < node->val) node->left = insert(node->left, val);
        else node->right = insert(node->right, val);
        return node;
    }
public:
    BST() : root(nullptr) {}
    void insert(int val) { root = insert(root, val); }
};`
  },
  avl: {
    js: `class AVLNode {
  constructor(val) { this.val = val; this.left = this.right = null; this.height = 1; }
}
class AVL {
  height(node) { return node ? node.height : 0; }
  rotateRight(y) {
    const x = y.left, T2 = x.right;
    x.right = y; y.left = T2;
    y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
    x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
    return x;
  }
}`,
    python: `class AVLNode:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None
        self.height = 1

class AVL:
    def height(self, node):
        return node.height if node else 0
    def rotate_right(self, y):
        x = y.left
        T2 = x.right
        x.right = y
        y.left = T2
        y.height = 1 + max(self.height(y.left), self.height(y.right))
        x.height = 1 + max(self.height(x.left), self.height(x.right))
        return x`,
    cpp: `struct AVLNode {
    int val, height;
    AVLNode *left, *right;
    AVLNode(int v) : val(v), height(1), left(nullptr), right(nullptr) {}
};
class AVL {
    int height(AVLNode* n) { return n ? n->height : 0; }
    AVLNode* rotateRight(AVLNode* y) {
        AVLNode* x = y->left;
        AVLNode* T2 = x->right;
        x->right = y; y->left = T2;
        y->height = 1 + std::max(height(y->left), height(y->right));
        x->height = 1 + std::max(height(x->left), height(x->right));
        return x;
    }
};`
  },
  heap: {
    js: `class MaxHeap {
  constructor() { this.arr = []; }
  parent(i) { return Math.floor((i - 1) / 2); }
  insert(val) {
    this.arr.push(val);
    let i = this.arr.length - 1;
    while (i > 0 && this.arr[this.parent(i)] < this.arr[i]) {
      [this.arr[i], this.arr[this.parent(i)]] = [this.arr[this.parent(i)], this.arr[i]];
      i = this.parent(i);
    }
  }
}`,
    python: `class MaxHeap:
    def __init__(self):
        self.arr = []
    def parent(self, i):
        return (i - 1) // 2
    def insert(self, val):
        self.arr.append(val)
        i = len(self.arr) - 1
        while i > 0 and self.arr[self.parent(i)] < self.arr[i]:
            self.arr[i], self.arr[self.parent(i)] = self.arr[self.parent(i)], self.arr[i]
            i = self.parent(i)`,
    cpp: `#include <vector>
class MaxHeap {
    std::vector<int> arr;
    int parent(int i) { return (i - 1) / 2; }
public:
    void insert(int val) {
        arr.push_back(val);
        int i = arr.size() - 1;
        while (i > 0 && arr[parent(i)] < arr[i]) {
            std::swap(arr[i], arr[parent(i)]);
            i = parent(i);
        }
    }
};`
  },
  graph: {
    js: `class Graph {
  constructor() { this.adj = new Map(); }
  addVertex(v) { if (!this.adj.has(v)) this.adj.set(v, []); }
  addEdge(u, v) { this.adj.get(u).push(v); this.adj.get(v).push(u); }
  bfs(start) {
    const visited = new Set(), queue = [start];
    visited.add(start);
    while (queue.length) {
      const v = queue.shift();
      for (const n of this.adj.get(v))
        if (!visited.has(n)) { visited.add(n); queue.push(n); }
    }
  }
}`,
    python: `from collections import deque

class Graph:
    def __init__(self):
        self.adj = {}
    def add_vertex(self, v):
        if v not in self.adj: self.adj[v] = []
    def add_edge(self, u, v):
        self.adj[u].append(v)
        self.adj[v].append(u)
    def bfs(self, start):
        visited = set()
        queue = deque([start])
        visited.add(start)
        while queue:
            v = queue.popleft()
            for n in self.adj[v]:
                if n not in visited:
                    visited.add(n)
                    queue.append(n)`,
    cpp: `#include <unordered_map>
#include <vector>
#include <queue>
class Graph {
    std::unordered_map<int, std::vector<int>> adj;
public:
    void addVertex(int v) { adj[v]; }
    void addEdge(int u, int v) { adj[u].push_back(v); adj[v].push_back(u); }
    void bfs(int start) {
        std::vector<bool> visited(1000, false);
        std::queue<int> q;
        q.push(start); visited[start] = true;
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (int n : adj[v])
                if (!visited[n]) { visited[n] = true; q.push(n); }
        }
    }
};`
  }
};
export default function DataStructureDetail() {
  const { dsId } = useParams();
  const [ds, setDs] = useState(null);
  const [tab, setTab] = useState('overview');
  const [lang, setLang] = useState('js');
  const [msg, setMsg] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef(null);
  const speedRef = useRef(150);
  const animState = useRef({});
  const { addTopic } = useProgress();

  const [selectedOp, setSelectedOp] = useState(null);
  const [status, setStatus] = useState('IDLE');
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [opInput, setOpInput] = useState({});
  const ops = ds ? Object.keys(dsOperations[ds.id] || {}) : [];
  const activeOp = (ds && selectedOp) ? dsOperations[ds.id]?.[selectedOp] : null;

  useEffect(() => {
    const found = dataStructures.find(d => d.id === dsId);
    if (found) { setDs(found); addTopic(found.name); }
    setSelectedOp(null);
    setStatus('IDLE');
    setHighlightedLines([]);
  }, [dsId, addTopic]);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c || !ds) return;
    const ctx = c.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;
    ctx.fillStyle = '#0f0e1c';
    ctx.fillRect(0, 0, w, h);
    const st = animState.current;
    switch (ds.id) {
      case 'arrays': drawArray(ctx, w, h, st); break;
      case 'linkedlist': drawLinkedList(ctx, w, h, st); break;
      case 'stack': drawStack(ctx, w, h, st); break;
      case 'queue': drawQueue(ctx, w, h, st); break;
      case 'bst': drawTree(ctx, w, h, st); break;
      case 'avl': drawAVL(ctx, w, h, st); break;
      case 'heap': drawHeap(ctx, w, h, st); break;
      case 'graph': drawGraph(ctx, w, h, st); break;
    }
  }, [ds]);

  useEffect(() => { draw(); }, [draw]);
function drawArray(ctx, w, h, st) {
    const arr = st.arr || [10, 25, 5, 30, 15, 20, 8];
    const bw = Math.min(60, (w - 40) / arr.length);
    const totalW = arr.length * bw;
    const startX = (w - totalW) / 2;
    const y = h / 2 - 30;
    arr.forEach((v, i) => {
      const x = startX + i * bw;
      ctx.fillStyle = (i === st.highlight) ? '#f59e0b' : '#6366f1';
      ctx.fillRect(x, y, bw - 2, 50);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(v, x + bw / 2 - 1, y + 32);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(i, x + bw / 2 - 1, y - 10);
    });
  }

  function drawLinkedList(ctx, w, h, st) {
    const nodes = st.nodes || [{v:10},{v:25},{v:5},{v:30}];
    const nw = 50, nh = 40, gap = 60;
    const totalW = nodes.length * nw + (nodes.length - 1) * gap;
    let x = (w - totalW) / 2;
    const y = h / 2 - 20;
    nodes.forEach((n, i) => {
      ctx.fillStyle = (i === st.highlight) ? '#f59e0b' : '#ec4899';
      ctx.fillRect(x, y, nw, nh);
      ctx.strokeStyle = '#fff'; ctx.strokeRect(x, y, nw, nh);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
      ctx.fillText(n.v, x + nw / 2, y + 26);
      if (i < nodes.length - 1) {
        ctx.strokeStyle = '#64748b';
        ctx.beginPath(); ctx.moveTo(x + nw, y + nh / 2); ctx.lineTo(x + nw + gap, y + nh / 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + nw + gap - 8, y + nh / 2 - 4); ctx.lineTo(x + nw + gap, y + nh / 2); ctx.lineTo(x + nw + gap - 8, y + nh / 2 + 4); ctx.stroke();
      }
      x += nw + gap;
    });
  }

  function drawStack(ctx, w, h, st) {
    const items = st.items || [40, 30, 20, 10];
    const bw = 80, bh = 35;
    const startX = (w - bw) / 2;
    const startY = h - 60;
    ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY + 10); ctx.lineTo(startX, startY - items.length * bh - 10);
    ctx.moveTo(startX + bw, startY + 10); ctx.lineTo(startX + bw, startY - items.length * bh - 10);
    ctx.moveTo(startX, startY + 10); ctx.lineTo(startX + bw, startY + 10); ctx.stroke();
    items.forEach((v, i) => {
      const y = startY - (items.length - i) * bh;
      ctx.fillStyle = (i === st.highlight) ? '#f59e0b' : '#22c55e';
      ctx.fillRect(startX + 1, y, bw - 2, bh - 2);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
      ctx.fillText(v, startX + bw / 2, y + 23);
    });
    ctx.fillStyle = '#fff'; ctx.font = 'bold 12px Inter';
    ctx.fillText('TOP', startX + bw / 2, h - 32);
  }

  function drawQueue(ctx, w, h, st) {
    const items = st.items || [10, 20, 30, 40];
    const bw = 70, bh = 40;
    const totalW = items.length * bw;
    const startX = (w - totalW) / 2;
    const y = h / 2 - 20;
    items.forEach((v, i) => {
      const x = startX + i * bw;
      ctx.fillStyle = (i === st.highlight) ? '#f59e0b' : '#f97316';
      ctx.globalAlpha = 0.85; ctx.fillRect(x, y, bw - 2, bh); ctx.globalAlpha = 1;
      ctx.strokeStyle = '#fff'; ctx.strokeRect(x, y, bw - 2, bh);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
      ctx.fillText(v, x + bw / 2 - 1, y + 26);
    });
    if (items.length > 0) {
      ctx.fillStyle = '#f97316'; ctx.font = 'bold 13px Inter';
      ctx.fillText('FRONT', startX - 45, y + bh + 20);
      ctx.fillText('REAR', startX + totalW - 30, y + bh + 20);
    }
  }

  function drawTreeNode(ctx, node, x, y, dx, dy, st) {
    if (!node) return;
    const r = 22;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = (node === st.highlight) ? '#f59e0b' : '#3b82f6';
    ctx.fill(); ctx.strokeStyle = '#fff'; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
    ctx.fillText(node.v, x, y + 5);
    if (node.bf !== undefined) { ctx.fillStyle = '#94a3b8'; ctx.font = '10px Inter'; ctx.fillText('bf:' + node.bf, x, y + r + 14); }
    if (node.l) { ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(x, y + r); ctx.lineTo(x - dx, y + dy - r); ctx.stroke(); drawTreeNode(ctx, node.l, x - dx, y + dy, dx / 2, dy, st); }
    if (node.r) { ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(x, y + r); ctx.lineTo(x + dx, y + dy - r); ctx.stroke(); drawTreeNode(ctx, node.r, x + dx, y + dy, dx / 2, dy, st); }
  }

  function drawTree(ctx, w, h, st) {
    const tree = st.tree || { v: 25, l: { v: 15, l: { v: 10 }, r: { v: 20 } }, r: { v: 35, l: { v: 30 }, r: { v: 40 } } };
    drawTreeNode(ctx, tree, w / 2, 50, w / 4, 60, st);
  }

  function drawAVL(ctx, w, h, st) {
    const tree = st.tree || { v: 30, l: { v: 20, l: { v: 10 } }, r: { v: 40, r: { v: 50 } } };
    drawTreeNode(ctx, tree, w / 2, 50, w / 4, 60, st);
  }

  function drawHeap(ctx, w, h, st) {
    const arr = st.arr || [50, 30, 20, 15, 10, 8, 16];
    const levelH = 70;
    function getPos(i, w2) {
      const level = Math.floor(Math.log2(i + 1));
      const posInLevel = i - (Math.pow(2, level) - 1);
      const nodesInLevel = Math.pow(2, level);
      return { x: (w2 / (nodesInLevel + 1)) * (posInLevel + 1), y: 40 + level * levelH };
    }
    arr.forEach((v, i) => {
      if (i > 0) {
        const p = getPos(Math.floor((i - 1) / 2), w);
        const c = getPos(i, w);
        ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(p.x, p.y + 22); ctx.lineTo(c.x, c.y - 22); ctx.stroke();
      }
    });
    arr.forEach((v, i) => {
      const pos = getPos(i, w);
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      ctx.fillStyle = (i === st.highlight) ? '#f59e0b' : '#ef4444';
      ctx.fill(); ctx.strokeStyle = '#fff'; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
      ctx.fillText(v, pos.x, pos.y + 5);
    });
  }

  function drawGraph(ctx, w, h, st) {
    const nodes = st.nodes || [{x:w*0.2,y:h*0.3,v:'A'},{x:w*0.5,y:h*0.2,v:'B'},{x:w*0.8,y:h*0.3,v:'C'},{x:w*0.35,y:h*0.6,v:'D'},{x:w*0.65,y:h*0.6,v:'E'}];
    const edges = st.edges || [[0,1],[1,2],[0,3],[3,4],[1,4],[2,4]];
    edges.forEach(([u,v]) => {
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(nodes[u].x, nodes[u].y); ctx.lineTo(nodes[v].x, nodes[v].y); ctx.stroke();
    });
    nodes.forEach((n, i) => {
      ctx.beginPath(); ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
      ctx.fillStyle = (i === st.highlight) ? '#f59e0b' : '#14b8a6';
      ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
      ctx.fillText(n.v, n.x, n.y + 5);
    });
  }

  
  async function highlightLine(stepIndex) {
    if (!activeOp || !activeOp.steps) return;
    const lineIdx = activeOp.steps[stepIndex];
    if (lineIdx === undefined) return;
    setHighlightedLines([lineIdx]);
    await sleep(speedRef.current);
  }
async function runAnim(type) {
    if (isRunning) return;
    setIsRunning(true);
    setStatus('RUNNING');
    const st = animState.current;
    const sp = speedRef.current;

    const opData = dsOperations[ds.id]?.[type];
    const hl = async (stepIndex) => {
      if (opData?.steps && opData.steps[stepIndex] !== undefined) {
        setHighlightedLines([opData.steps[stepIndex]]);
      }
      draw();
      await sleep(sp);
    };

    const initArr = () => [...(st.arr || [10,25,5,30,15,20,8])];
    const initNodes = () => [...(st.nodes || [{v:10},{v:25},{v:5},{v:30}])];
    const initItems = () => [...(st.items || [10,20,30,40])];
    const initTree = () => st.tree ? JSON.parse(JSON.stringify(st.tree))
      : {v:25,l:{v:15,l:{v:10},r:{v:20}},r:{v:35,l:{v:30},r:{v:40}}};
    const initHeap = () => [...(st.arr || [50,30,20,15,10,8])];

    try {
      const getParam = () => {
        const first = opData?.params?.[0]?.name;
        if (!first) return null;
        const v = opInput?.[type]?.[first];
        if (v === undefined || v === '') return null;
        if (first === 'start') return v;
        const n = parseInt(v, 10);
        return isNaN(n) ? null : n;
      };
      const param = getParam();

      switch (ds.id + '_' + type) {
        // ===== ARRAYS =====
        case 'arrays_search': {
          st.arr = initArr();
          const target = param ?? st.arr[Math.floor(Math.random()*st.arr.length)];
          setMsg('Searching for: ' + target);
          await hl(0);
          await hl(1);
          let foundIdx = -1;
          for (let i = 0; i < st.arr.length; i++) {
            st.highlight = i; draw(); await sleep(sp);
            await hl(2);
            if (st.arr[i] === target) {
              foundIdx = i;
              setMsg('Found ' + target + ' at index ' + i);
              await hl(3);
              break;
            }
          }
          if (foundIdx === -1) setMsg(target + ' not found');
          await hl(4);
          await hl(5);
          st.highlight = -1;
          break;
        }
        case 'arrays_insert': {
          st.arr = initArr();
          const val = param ?? Math.floor(Math.random()*90)+10;
          setMsg('Inserting: ' + val);
          await hl(0);
          await hl(1);
          if (st.arr.length >= 15) {
            await hl(2);
            setMsg('Array full!');
            break;
          }
          await hl(3);
          st.arr.push(val);
          st.highlight = st.arr.length - 1;
          draw(); await sleep(sp);
          await hl(4);
          await hl(5);
          st.highlight = -1;
          break;
        }
        case 'arrays_delete': {
          st.arr = initArr();
          const pos = param ?? Math.floor(Math.random()*st.arr.length);
          setMsg('Deleting at index: ' + pos);
          await hl(0);
          await hl(1);
          if (pos < 0 || pos >= st.arr.length) {
            await hl(2);
            setMsg('Invalid index!');
            break;
          }
          await hl(3);
          for (let i = pos; i < st.arr.length - 1; i++) {
            st.highlight = i;
            st.arr[i] = st.arr[i+1];
            draw(); await sleep(sp);
            await hl(4);
          }
          st.arr.pop();
          setMsg('Deleted element at index ' + pos);
          await hl(5);
          st.highlight = -1;
          break;
        }
        case 'arrays_findMin': {
          st.arr = initArr();
          setMsg('Finding minimum...');
          await hl(0);
          if (st.arr.length === 0) {
            await hl(1);
            setMsg('Array is empty!');
            break;
          }
          let min = st.arr[0];
          st.highlight = 0;
          draw(); await sleep(sp);
          await hl(2);
          for (let i = 1; i < st.arr.length; i++) {
            st.highlight = i; draw(); await sleep(sp);
            await hl(3);
            await hl(4);
            if (st.arr[i] < min) {
              min = st.arr[i];
              setMsg('New minimum: ' + min);
            }
            await hl(5);
          }
          setMsg('Minimum is: ' + min);
          await hl(6);
          st.highlight = -1;
          break;
        }
        case 'arrays_findMax': {
          st.arr = initArr();
          setMsg('Finding maximum...');
          await hl(0);
          if (st.arr.length === 0) {
            await hl(1);
            setMsg('Array is empty!');
            break;
          }
          let max = st.arr[0];
          st.highlight = 0;
          draw(); await sleep(sp);
          await hl(2);
          for (let i = 1; i < st.arr.length; i++) {
            st.highlight = i; draw(); await sleep(sp);
            await hl(3);
            await hl(4);
            if (st.arr[i] > max) {
              max = st.arr[i];
              setMsg('New maximum: ' + max);
            }
            await hl(5);
          }
          setMsg('Maximum is: ' + max);
          await hl(6);
          st.highlight = -1;
          break;
        }
        case 'arrays_reverse': {
          st.arr = initArr();
          setMsg('Reversing array...');
          await hl(0);
          let left = 0, right = st.arr.length - 1;
          st.highlight = left;
          draw(); await sleep(sp);
          await hl(1);
          await hl(2);
          while (left < right) {
            await hl(3);
            [st.arr[left], st.arr[right]] = [st.arr[right], st.arr[left]];
            st.highlight = left;
            st.highlight2 = right;
            setMsg('Swapped indices ' + left + ' and ' + right);
            draw(); await sleep(sp);
            await hl(4);
            left++;
            await hl(5);
            right--;
            await hl(6);
          }
          st.highlight = -1; st.highlight2 = -1;
          setMsg('Array reversed!');
          break;
        }

        // ===== LINKED LIST =====
        case 'linkedlist_insertHead': {
          st.nodes = initNodes();
          const val = param ?? Math.floor(Math.random()*90)+10;
          setMsg('Inserting ' + val + ' at head');
          await hl(0);
          await hl(1);
          st.nodes.unshift({v:val});
          st.highlight = 0;
          draw(); await sleep(sp);
          await hl(2);
          await hl(3);
          await hl(4);
          await hl(5);
          st.highlight = -1;
          break;
        }
        case 'linkedlist_insertTail': {
          st.nodes = initNodes();
          const val = param ?? Math.floor(Math.random()*90)+10;
          setMsg('Inserting ' + val + ' at tail');
          await hl(0);
          await hl(1);
          if (st.nodes.length === 0) {
            st.nodes.push({v:val});
            st.highlight = 0; draw(); await sleep(sp);
            await hl(2);
            break;
          }
          let i = 0;
          for (; i < st.nodes.length; i++) {
            st.highlight = i; draw(); await sleep(sp);
            await hl(3);
            await hl(4);
          }
          st.nodes.push({v:val});
          st.highlight = st.nodes.length - 1;
          draw(); await sleep(sp);
          await hl(5);
          await hl(6);
          await hl(7);
          st.highlight = -1;
          break;
        }
        case 'linkedlist_delete': {
          st.nodes = initNodes();
          const val = param ?? st.nodes[0]?.v;
          setMsg('Deleting value: ' + val);
          await hl(0);
          await hl(1);
          if (st.nodes.length === 0) {
            await hl(2);
            setMsg('List is empty!');
            break;
          }
          if (st.nodes[0].v === val) {
            st.highlight = 0; draw(); await sleep(sp);
            await hl(3);
            st.nodes.shift();
            setMsg('Deleted head: ' + val);
            draw(); await sleep(sp);
            await hl(4);
            break;
          }
          for (let i = 0; i < st.nodes.length - 1; i++) {
            st.highlight = i; draw(); await sleep(sp);
            await hl(5);
            await hl(6);
            if (st.nodes[i+1].v === val) {
              st.highlight2 = i+1; draw(); await sleep(sp);
              await hl(7);
              st.nodes.splice(i+1, 1);
              setMsg('Deleted: ' + val);
              draw(); await sleep(sp);
              await hl(8);
              break;
            }
          }
          await hl(9);
          await hl(10);
          st.highlight = -1; st.highlight2 = -1;
          break;
        }
        case 'linkedlist_search': {
          st.nodes = initNodes();
          const val = param ?? st.nodes[Math.floor(Math.random()*st.nodes.length)]?.v;
          setMsg('Searching for: ' + val);
          await hl(0);
          await hl(1);
          await hl(2);
          for (let i = 0; i < st.nodes.length; i++) {
            st.highlight = i; draw(); await sleep(sp);
            await hl(3);
            if (st.nodes[i].v === val) {
              setMsg('Found ' + val + ' at position ' + i);
              await hl(4);
              break;
            }
            await hl(5);
            await hl(6);
          }
          await hl(7);
          st.highlight = -1;
          break;
        }
        case 'linkedlist_reverse': {
          st.nodes = initNodes();
          setMsg('Reversing linked list...');
          await hl(0);
          let rev = [];
          await hl(1);
          await hl(2);
          for (let i = 0; i < st.nodes.length; i++) {
            st.highlight = i; draw(); await sleep(sp);
            await hl(3);
            rev.unshift(st.nodes[i]);
            await hl(4);
            await hl(5);
            await hl(6);
            await hl(7);
          }
          st.nodes = rev;
          st.highlight = -1;
          draw(); await sleep(sp);
          setMsg('List reversed!');
          await hl(8);
          break;
        }

        // ===== STACK =====
        case 'stack_push': {
          st.items = initItems();
          const val = param ?? Math.floor(Math.random()*90)+10;
          setMsg('Pushing: ' + val);
          await hl(0);
          await hl(1);
          if (st.items.length >= 15) {
            await hl(2);
            setMsg('Stack overflow!');
            break;
          }
          await hl(3);
          st.items.unshift(val);
          st.highlight = 0;
          draw(); await sleep(sp);
          await hl(4);
          await hl(5);
          st.highlight = -1;
          break;
        }
        case 'stack_pop': {
          st.items = initItems();
          setMsg('Popping...');
          await hl(0);
          if (st.items.length === 0) {
            await hl(1);
            await hl(2);
            setMsg('Stack underflow!');
            break;
          }
          st.highlight = 0; draw(); await sleep(sp);
          await hl(3);
          const val = st.items.shift();
          setMsg('Popped: ' + val);
          draw(); await sleep(sp);
          await hl(4);
          await hl(5);
          st.highlight = -1;
          break;
        }
        case 'stack_peek': {
          st.items = initItems();
          setMsg('Peeking...');
          await hl(0);
          if (st.items.length === 0) {
            await hl(1);
            await hl(2);
            setMsg('Stack is empty!');
            break;
          }
          st.highlight = 0; draw(); await sleep(sp);
          await hl(3);
          setMsg('Top element: ' + st.items[0]);
          break;
        }
        case 'stack_isEmpty': {
          st.items = initItems();
          const empty = st.items.length === 0;
          setMsg('Is stack empty? ' + empty);
          await hl(0);
          await hl(1);
          await hl(2);
          break;
        }

        // ===== QUEUE =====
        case 'queue_enqueue': {
          st.items = initItems();
          const val = param ?? Math.floor(Math.random()*90)+10;
          setMsg('Enqueuing: ' + val);
          await hl(0);
          await hl(1);
          if (st.items.length >= 15) {
            await hl(2);
            setMsg('Queue overflow!');
            break;
          }
          await hl(3);
          st.items.push(val);
          st.highlight = st.items.length - 1;
          draw(); await sleep(sp);
          await hl(4);
          if (st.items.length === 1) {
            await hl(5);
            await hl(6);
          }
          st.highlight = -1;
          break;
        }
        case 'queue_dequeue': {
          st.items = initItems();
          setMsg('Dequeuing...');
          await hl(0);
          if (st.items.length === 0) {
            await hl(1);
            await hl(2);
            setMsg('Queue underflow!');
            break;
          }
          st.highlight = 0; draw(); await sleep(sp);
          await hl(3);
          const val = st.items.shift();
          setMsg('Dequeued: ' + val);
          draw(); await sleep(sp);
          if (st.items.length === 0) {
            await hl(4);
            await hl(5);
            await hl(6);
          } else {
            await hl(7);
          }
          await hl(8);
          await hl(9);
          st.highlight = -1;
          break;
        }
        case 'queue_peek': {
          st.items = initItems();
          setMsg('Peeking...');
          await hl(0);
          if (st.items.length === 0) {
            await hl(1);
            await hl(2);
            setMsg('Queue is empty!');
            break;
          }
          st.highlight = 0; draw(); await sleep(sp);
          await hl(3);
          setMsg('Front element: ' + st.items[0]);
          break;
        }
        case 'queue_isEmpty': {
          st.items = initItems();
          const empty = st.items.length === 0;
          setMsg('Is queue empty? ' + empty);
          await hl(0);
          await hl(1);
          await hl(2);
          break;
        }

        // ===== BST =====
        case 'bst_insert': {
          const val = param ?? Math.floor(Math.random()*90)+10;
          setMsg('BST Insert: ' + val);
          st.tree = initTree();
          await hl(0);
          let curr = st.tree;
          let depth = 0;
          while (curr && depth < 10) {
            st.highlight = curr;
            draw(); await sleep(sp);
            if (val < curr.v) {
              await hl(3);
              if (!curr.l) {
                await hl(4);
                curr.l = {v:val};
                break;
              }
              curr = curr.l;
            } else {
              await hl(5);
              if (!curr.r) {
                await hl(6);
                curr.r = {v:val};
                break;
              }
              curr = curr.r;
            }
            depth++;
          }
          if (!st.tree) st.tree = {v:val};
          setMsg('Inserted ' + val);
          await hl(7);
          st.highlight = null;
          break;
        }
        case 'bst_search': {
          const val = param ?? 30;
          setMsg('BST Search: ' + val);
          st.tree = initTree();
          await hl(0);
          let node = st.tree;
          let found = false;
          let steps = 0;
          while (node && steps < 20) {
            steps++;
            st.highlight = node;
            draw(); await sleep(sp);
            if (node.v === val) {
              setMsg('Found ' + val + '!');
              await hl(3);
              await hl(4);
              found = true;
              break;
            }
            if (val < node.v) {
              await hl(5);
              node = node.l;
            } else {
              await hl(6);
              node = node.r;
            }
          }
          if (!found) {
            setMsg(val + ' not found');
            await hl(1);
            await hl(2);
          }
          await hl(7);
          st.highlight = null;
          break;
        }

        // ===== AVL =====
        case 'avl_insert': {
          const val = param ?? Math.floor(Math.random()*90)+10;
          setMsg('AVL Insert: ' + val);
          st.tree = initTree();
          await hl(0);
          let curr = st.tree;
          let depth = 0;
          while (curr && depth < 10) {
            st.highlight = curr;
            draw(); await sleep(sp);
            if (val < curr.v) {
              await hl(3);
              if (!curr.l) { curr.l = {v:val,height:1,bf:0}; break; }
              curr = curr.l;
            } else {
              await hl(5);
              if (!curr.r) { curr.r = {v:val,height:1,bf:0}; break; }
              curr = curr.r;
            }
            depth++;
          }
          if (!st.tree) st.tree = {v:val,height:1,bf:0};
          setMsg('Inserted ' + val);
          await hl(1); await sleep(sp);
          await hl(2); await sleep(sp);
          await hl(6); await sleep(sp);
          await hl(7); await sleep(sp);
          await hl(8); await sleep(sp);
          await hl(9); await sleep(sp);
          setMsg('Checking balance factor...');
          st.highlight = st.tree;
          draw(); await sleep(sp);
          await hl(10); await sleep(sp);
          await hl(11); await sleep(sp);
          await hl(12); await sleep(sp);
          st.highlight = null;
          setMsg('Inserted ' + val + ' (with balancing)');
          break;
        }
        case 'avl_search': {
          const val = param ?? 30;
          setMsg('AVL Search: ' + val);
          st.tree = initTree();
          await hl(0);
          let node = st.tree;
          let found = false;
          let steps = 0;
          while (node && steps < 20) {
            steps++;
            st.highlight = node;
            draw(); await sleep(sp);
            if (node.v === val) {
              setMsg('Found ' + val + '!');
              await hl(3);
              await hl(4);
              found = true;
              break;
            }
            if (val < node.v) {
              await hl(5);
              node = node.l;
            } else {
              await hl(6);
              node = node.r;
            }
          }
          if (!found) {
            setMsg(val + ' not found');
            await hl(1);
            await hl(2);
          }
          await hl(7);
          st.highlight = null;
          break;
        }

        // ===== HEAP =====
        case 'heap_insert': {
          st.arr = initHeap();
          const val = param ?? Math.floor(Math.random()*90)+10;
          setMsg('Heap Insert: ' + val);
          await hl(0);
          await hl(1);
          let i = st.arr.length;
          await hl(2);
          st.arr.push(val);
          st.highlight = st.arr.length - 1;
          draw(); await sleep(sp);
          await hl(3);
          while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            setMsg('Checking parent index ' + parent);
            st.highlight = parent; st.highlight2 = i;
            draw(); await sleep(sp);
            await hl(4);
            await hl(5);
            if (st.arr[parent] >= st.arr[i]) {
              await hl(6);
              break;
            }
            await hl(7);
            [st.arr[parent], st.arr[i]] = [st.arr[i], st.arr[parent]];
            setMsg('Swapped with parent');
            draw(); await sleep(sp);
            await hl(8);
            i = parent;
          }
          setMsg('Heap Insert done');
          st.highlight = -1; st.highlight2 = -1;
          break;
        }
        case 'heap_extractMax': {
          st.arr = initHeap();
          if (st.arr.length === 0) {
            setMsg('Heap is empty!');
            await hl(0);
            await hl(1);
            await hl(2);
            break;
          }
          setMsg('Extracting max...');
          await hl(0);
          await hl(1);
          const maxVal = st.arr[0];
          await hl(3);
          st.arr[0] = st.arr[st.arr.length - 1];
          st.highlight = 0;
          draw(); await sleep(sp);
          await hl(4);
          st.arr.pop();
          await hl(5);
          setMsg('Max was: ' + maxVal + '. Heapifying down...');
          let i = 0;
          await hl(6);
          while (true) {
            let l = 2*i+1, r=2*i+2, largest=i;
            if (l < st.arr.length && st.arr[l] > st.arr[largest]) largest = l;
            if (r < st.arr.length && st.arr[r] > st.arr[largest]) largest = r;
            if (largest === i) break;
            [st.arr[i], st.arr[largest]] = [st.arr[largest], st.arr[i]];
            st.highlight = i; st.highlight2 = largest;
            draw(); await sleep(sp);
            i = largest;
          }
          setMsg('Max extracted: ' + maxVal);
          await hl(7);
          await hl(8);
          st.highlight = -1; st.highlight2 = -1;
          break;
        }
        case 'heap_getMax': {
          st.arr = initHeap();
          setMsg('Getting max...');
          await hl(0);
          if (st.arr.length === 0) {
            await hl(1);
            await hl(2);
            setMsg('Heap is empty!');
            break;
          }
          st.highlight = 0;
          draw(); await sleep(sp);
          await hl(3);
          setMsg('Max element: ' + st.arr[0]);
          st.highlight = -1;
          break;
        }

        // ===== GRAPH =====
        case 'graph_bfs': {
          const start = (param !== null && param !== undefined) ? String(param) : 'A';
          st.nodes = [
            {x:100,y:80,v:'A'},{x:250,y:50,v:'B'},{x:400,y:80,v:'C'},
            {x:175,y:180,v:'D'},{x:325,y:180,v:'E'}
          ];
          st.edges = [[0,1],[1,2],[0,3],[3,4],[1,4],[2,4]];
          const adj = {'A':['B','D'],'B':['A','C','E'],'C':['B','E'],'D':['A','E'],'E':['D','B','C']};
          setMsg('BFS starting from ' + start);
          await hl(0);
          const visited = new Set();
          const queue = [start];
          await hl(1);
          await hl(2);
          if (adj[start]) {
            visited.add(start);
            const sIdx = st.nodes.findIndex(n => n.v === start);
            st.highlight = sIdx;
            draw(); await sleep(sp);
          }
          await hl(3);
          while (queue.length > 0) {
            await hl(4);
            const v = queue.shift();
            const idx = st.nodes.findIndex(n => n.v === v);
            st.highlight = idx;
            draw(); await sleep(sp);
            await hl(5);
            for (const u of (adj[v] || [])) {
              await hl(6);
              await hl(7);
              if (!visited.has(u)) {
                await hl(8);
                visited.add(u);
                queue.push(u);
                await hl(9);
                await hl(10);
              }
            }
          }
          setMsg('BFS complete! Visited: ' + Array.from(visited).join(', '));
          break;
        }
        case 'graph_dfs': {
          const start = (param !== null && param !== undefined) ? String(param) : 'A';
          st.nodes = [
            {x:100,y:80,v:'A'},{x:250,y:50,v:'B'},{x:400,y:80,v:'C'},
            {x:175,y:180,v:'D'},{x:325,y:180,v:'E'}
          ];
          st.edges = [[0,1],[1,2],[0,3],[3,4],[1,4],[2,4]];
          const adj = {'A':['B','D'],'B':['A','C','E'],'C':['B','E'],'D':['A','E'],'E':['D','B','C']};
          setMsg('DFS starting from ' + start);
          await hl(0);
          const visited = new Set();
          const stack = [start];
          await hl(1);
          await hl(2);
          while (stack.length > 0) {
            await hl(3);
            const v = stack.pop();
            setMsg('Visiting: ' + v);
            const idx = st.nodes.findIndex(n => n.v === v);
            st.highlight = idx;
            draw(); await sleep(sp);
            await hl(4);
            if (!visited.has(v)) {
              await hl(5);
              visited.add(v);
              await hl(6);
              for (const u of (adj[v] || []).slice().reverse()) {
                await hl(7);
                await hl(8);
                if (!visited.has(u)) {
                  await hl(9);
                  stack.push(u);
                  await hl(10);
                }
              }
            }
          }
          setMsg('DFS complete! Visited: ' + Array.from(visited).join(', '));
          break;
        }

        default:
          setMsg('Demo animation: ' + type);
          if (opData && opData.steps) {
            for (let i = 0; i < opData.steps.length; i++) {
              await hl(i);
            }
          } else {
            await sleep(500);
          }
      }
    } catch(e) {
      console.error(e);
    } finally {
      setIsRunning(false);
      setStatus('FINISHED');
      setHighlightedLines([]);
      draw();
    }
  }

  
  function reset() {
    animState.current = {};
    setMsg('');
    setStatus('IDLE');
    setHighlightedLines([]);
    setSelectedOp(null);
    draw();
  }

  if (!ds) return <div className="detail-page"><div className="container"><h2>Not found</h2></div></div>;

  const complexity = dsComplexity[ds.id] || {};
  const code = dsCode[ds.id];

  return (
    <div className="detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => window.history.back()}>&larr; Back</button>
        <h1>{ds.name}</h1>
        <p className="detail-desc">{ds.details || ds.description}</p>

        <div className="detail-grid">
          <div className="detail-sidebar">
            <div className="panel">
              <h3>Complexity</h3>
              {Object.entries(complexity).map(([k,v]) => (
                <div className="stat-row" key={k}><span>{k.charAt(0).toUpperCase() + k.slice(1)}</span><span className="badge">{v}</span></div>
              ))}
            </div>
            <div className="panel">
              <h3>Operations</h3>
              <div className="op-selector">
                {ops.map(op => (
                  <button
                    key={op}
                    className={selectedOp === op ? 'op-btn selected' : 'op-btn'}
                    onClick={() => {
                      if (isRunning) return;
                      setSelectedOp(op);
                      setHighlightedLines([]);
                      setMsg('');
                    }}
                    disabled={isRunning}
                  >
                    {op.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                ))}
              </div>
              <div className="msg-display">{msg}</div>
            </div>
            {activeOp && (
              <div className="panel">
                <h3>Run: {activeOp.name}</h3>
                {activeOp.params && activeOp.params.length > 0 && (
                  <div className="op-params" style={{marginTop:8}}>
                    {activeOp.params.map(p => (
                      <div key={p.name} style={{marginBottom:6}}>
                        <label style={{fontSize:'0.8rem',display:'block'}} className="hint-text">{p.name}</label>
                        <input
                          type={p.type === 'number' ? 'number' : 'text'}
                          value={opInput[selectedOp]?.[p.name] || ''}
                          onChange={e => setOpInput(prev => ({
                            ...prev,
                            [selectedOp]: {
                              ...prev[selectedOp],
                              [p.name]: e.target.value
                            }
                          }))}
                          disabled={isRunning}
                          style={{width:'100%',padding:'4px 8px',borderRadius:4,border:'1px solid #334155',background:'#0f172a',color:'#fff',fontSize:'0.85rem'}}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="btn-row" style={{marginTop:8}}>
                  <button
                    className="btn btn-primary"
                    onClick={() => runAnim(selectedOp)}
                    disabled={isRunning}
                  >
                    {isRunning ? 'Running...' : status === 'FINISHED' ? 'Run Again' : 'Run'}
                  </button>
                  <button className="btn" onClick={reset} disabled={isRunning}>Reset</button>
                </div>
                {activeOp.maxElements !== undefined && (
                  <div className="hint-text">Max {activeOp.maxElements} elements for insert</div>
                )}
                <label style={{fontSize:'0.8rem',marginTop:8,display:'block'}} className="hint-text">Speed</label>
                <input type="range" min="20" max="300" defaultValue="150" onChange={e => speedRef.current = 320 - e.target.value} disabled={isRunning} />
              </div>
            )}
          </div>

          <div className="detail-main">
            <div className="tabs">
              <button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}>Overview</button>
              <button className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>Code</button>
            </div>

            {tab === 'overview' && (
              <div className="tab-panel">
                <h3>{ds.name} Visualization</h3>
                <div style={{ height: '320px', borderRadius: '8px', overflow: 'hidden', background: '#0f0e1c' }}>
                  <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
                </div>
                <p style={{marginTop:12,fontSize:'0.9rem'}} className="hint-text">
                  Use the operation selector on the left to interact with the {ds.name.toLowerCase()}.
                </p>

                {activeOp && activeOp.pseudocode && (
                  <div className="pseudocode-section" style={{ marginTop: 20 }}>
                    <h4>Pseudocode: {activeOp.name}</h4>
                    <div className="pseudo-block">
                      {activeOp.pseudocode.map((line, idx) => (
                        <div
                          key={idx}
                          className={highlightedLines.includes(idx) ? 'pseudo-line highlight' : 'pseudo-line'}
                        >
                          <span className="line-num">{idx + 1}</span>
                          <span className="line-txt">{line}</span>
                        </div>
                      ))}
                    </div>
                    {status === 'RUNNING' && <span className="status-badge running">Running</span>}
                    {status === 'FINISHED' && <span className="status-badge finished">Finished</span>}
                    {status === 'IDLE' && <span className="status-badge idle">Idle</span>}
                  </div>
                )}
              </div>
            )}

            {tab === 'code' && (
              <div className="tab-panel">
                <div className="lang-tabs">
                  <button className={lang === 'js' ? 'active' : ''} onClick={() => setLang('js')}>JavaScript</button>
                  <button className={lang === 'python' ? 'active' : ''} onClick={() => setLang('python')}>Python</button>
                  <button className={lang === 'cpp' ? 'active' : ''} onClick={() => setLang('cpp')}>C++</button>
                </div>
                <pre className="code-block">{code ? code[lang] : '// Code coming soon...'}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
