import { useEffect, useRef, useState, useCallback } from 'react';

const codeExamples = {
  python: `# Graph using Adjacency List
class Graph:
    def __init__(self):
        self.adj = {}
    
    def add_edge(self, u, v):
        if u not in self.adj:
            self.adj[u] = []
        if v not in self.adj:
            self.adj[v] = []
        self.adj[u].append(v)
        self.adj[v].append(u)  # Undirected
    
    # BFS - O(V + E)
    def bfs(self, start):
        visited = set()
        queue = [start]
        visited.add(start)
        
        while queue:
            node = queue.pop(0)
            print(node, end=' ')
            for neighbor in self.adj[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
    
    # DFS - O(V + E)
    def dfs(self, start, visited=None):
        if visited is None:
            visited = set()
        visited.add(start)
        print(start, end=' ')
        
        for neighbor in self.adj[start]:
            if neighbor not in visited:
                self.dfs(neighbor, visited)`,

  javascript: `// Graph using Adjacency List
class Graph {
  constructor() {
    this.adj = new Map();
  }

  addEdge(u, v) {
    if (!this.adj.has(u)) this.adj.set(u, []);
    if (!this.adj.has(v)) this.adj.set(v, []);
    this.adj.get(u).push(v);
    this.adj.get(v).push(u); // Undirected
  }

  // BFS - O(V + E)
  bfs(start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);

    while (queue.length > 0) {
      const node = queue.shift();
      console.log(node);
      for (const neighbor of this.adj.get(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  // DFS - O(V + E)
  dfs(start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    for (const neighbor of this.adj.get(start)) {
      if (!visited.has(neighbor)) {
        this.dfs(neighbor, visited);
      }
    }
  }
}`,

  java: `import java.util.*;

class Graph {
    private Map<Integer, List<Integer>> adj;
    
    public Graph() {
        adj = new HashMap<>();
    }
    
    public void addEdge(int u, int v) {
        adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
        adj.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
    }
    
    // BFS - O(V + E)
    public void bfs(int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        visited.add(start);
        queue.add(start);
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");
            for (int neighbor : adj.get(node)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
    }
    
    // DFS - O(V + E)
    public void dfs(int start) {
        Set<Integer> visited = new HashSet<>();
        dfsHelper(start, visited);
    }
    
    private void dfsHelper(int node, Set<Integer> visited) {
        visited.add(node);
        System.out.print(node + " ");
        for (int neighbor : adj.get(node)) {
            if (!visited.contains(neighbor)) {
                dfsHelper(neighbor, visited);
            }
        }
    }
}`,

  cpp: `#include <bits/stdc++.h>
using namespace std;

class Graph {
    unordered_map<int, vector<int>> adj;
    
public:
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    // BFS - O(V + E)
    void bfs(int start) {
        unordered_set<int> visited;
        queue<int> q;
        visited.insert(start);
        q.push(start);
        
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            cout << node << " ";
            for (int neighbor : adj[node]) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
    }
    
    // DFS - O(V + E)
    void dfs(int start) {
        unordered_set<int> visited;
        dfsHelper(start, visited);
    }
    
private:
    void dfsHelper(int node, unordered_set<int>& visited) {
        visited.insert(node);
        cout << node << " ";
        for (int neighbor : adj[node]) {
            if (visited.find(neighbor) == visited.end()) {
                dfsHelper(neighbor, visited);
            }
        }
    }
};`
};

const GraphVisualizer = () => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([
    { id: 0, x: 400, y: 80 },
    { id: 1, x: 200, y: 180 },
    { id: 2, x: 600, y: 180 },
    { id: 3, x: 100, y: 300 },
    { id: 4, x: 300, y: 300 },
    { id: 5, x: 500, y: 300 },
    { id: 6, x: 700, y: 300 }
  ]);
  const [edges] = useState([
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5], [2, 6],
    [4, 5]
  ]);
  const [activeNodes, setActiveNodes] = useState(new Set());
  const [currentNode, setCurrentNode] = useState(null);
  const [visitedOrder, setVisitedOrder] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

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
      
      // Background
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim() || '#1a1a2e';
      ctx.fillRect(0, 0, width, height);
      
      // Adjust node positions for canvas size
      const scaleX = width / 800;
      const scaleY = height / 400;
      
      // Draw edges
      edges.forEach(([u, v]) => {
        const nodeU = nodes.find(n => n.id === u);
        const nodeV = nodes.find(n => n.id === v);
        
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodeU.x * scaleX, nodeU.y * scaleY);
        ctx.lineTo(nodeV.x * scaleX, nodeV.y * scaleY);
        ctx.stroke();
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const x = node.x * scaleX;
        const y = node.y * scaleY;
        const radius = 24;
        
        const isActive = activeNodes.has(node.id);
        const isCurrent = currentNode === node.id;
        
        // Circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (isCurrent) {
          ctx.fillStyle = '#f59e0b';
        } else if (isActive) {
          ctx.fillStyle = '#6366f1';
        } else {
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim() || '#16162a';
        }
        ctx.fill();
        
        // Border
        ctx.strokeStyle = isCurrent ? '#f97316' : isActive ? '#8b5cf6' : '#6366f1';
        ctx.lineWidth = isCurrent || isActive ? 3 : 2;
        ctx.stroke();
        
        // Value
        ctx.fillStyle = isCurrent || isActive ? '#ffffff' : getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#f8fafc';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id.toString(), x, y);
      });
    };
    
    draw();
    
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nodes, edges, activeNodes, currentNode]);

  const getAdjacencyList = useCallback(() => {
    const adj = new Map();
    nodes.forEach(n => adj.set(n.id, []));
    edges.forEach(([u, v]) => {
      adj.get(u).push(v);
      adj.get(v).push(u);
    });
    return adj;
  }, [nodes, edges]);

  const runBFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveNodes(new Set());
    setVisitedOrder([]);
    setCurrentNode(null);
    
    const adj = getAdjacencyList();
    const visited = new Set();
    const queue = [0];
    const order = [];
    
    visited.add(0);
    
    while (queue.length > 0) {
      const node = queue.shift();
      setCurrentNode(node);
      order.push(node);
      setVisitedOrder([...order]);
      await sleep(600);
      
      visited.add(node);
      setActiveNodes(new Set(visited));
      setCurrentNode(null);
      await sleep(200);
      
      for (const neighbor of adj.get(node) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          setActiveNodes(new Set(visited));
          queue.push(neighbor);
          await sleep(200);
        }
      }
    }
    
    setIsRunning(false);
  };

  const runDFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveNodes(new Set());
    setVisitedOrder([]);
    setCurrentNode(null);
    
    const adj = getAdjacencyList();
    const visited = new Set();
    const order = [];
    
    const dfs = async (node) => {
      visited.add(node);
      setActiveNodes(new Set(visited));
      setCurrentNode(node);
      order.push(node);
      setVisitedOrder([...order]);
      await sleep(600);
      setCurrentNode(null);
      await sleep(200);
      
      for (const neighbor of adj.get(node) || []) {
        if (!visited.has(neighbor)) {
          await dfs(neighbor);
        }
      }
    };
    
    await dfs(0);
    setIsRunning(false);
  };

  const reset = () => {
    setActiveNodes(new Set());
    setVisitedOrder([]);
    setCurrentNode(null);
    setIsRunning(false);
  };

  return (
    <div className="visualizer-wrapper">
      <div className="visualizer-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '350px' }} />
      </div>

      <div className="visualizer-controls">
        <button className="btn btn-primary btn-small" onClick={runBFS} disabled={isRunning}>
          BFS Traversal
        </button>
        <button className="btn btn-primary btn-small" onClick={runDFS} disabled={isRunning}>
          DFS Traversal
        </button>
        <button className="btn btn-small" onClick={reset} disabled={isRunning}>
          Reset
        </button>
      </div>

      {visitedOrder.length > 0 && (
        <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginTop: '1rem' }}>
          <strong>Visited Order:</strong> [{visitedOrder.join(' → ')}]
        </div>
      )}

      <div className="complexity-grid">
        <div className="complexity-item">
          <label>BFS Time</label>
          <span>O(V + E)</span>
        </div>
        <div className="complexity-item">
          <label>DFS Time</label>
          <span>O(V + E)</span>
        </div>
        <div className="complexity-item">
          <label>Space</label>
          <span>O(V)</span>
        </div>
      </div>

      <div className="operations-list">
        <span className="operation-tag">Social Networks</span>
        <span className="operation-tag">Path Finding</span>
        <span className="operation-tag">Dependency Graph</span>
        <span className="operation-tag">Connected Components</span>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <div className="language-tabs">
          {Object.keys(codeExamples).map((lang) => (
            <button
              key={lang}
              className={`language-tab ${language === lang ? 'active' : ''}`}
              onClick={() => setLanguage(lang)}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
        <div className="code-block">
          <pre>{codeExamples[language]}</pre>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
