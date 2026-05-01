import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, key):
        self.root = self._insert(self.root, key)
    
    def _insert(self, node, key):
        if not node:
            return Node(key)
        if key < node.key:
            node.left = self._insert(node.left, key)
        else:
            node.right = self._insert(node.right, key)
        return node
    
    def search(self, key):
        return self._search(self.root, key)
    
    def _search(self, node, key):
        if not node or node.key == key:
            return node
        if key < node.key:
            return self._search(node.left, key)
        return self._search(node.right, key)`,

  javascript: `class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(key) {
    this.root = this._insert(this.root, key);
  }

  _insert(node, key) {
    if (!node) return new Node(key);
    if (key < node.key) {
      node.left = this._insert(node.left, key);
    } else {
      node.right = this._insert(node.right, key);
    }
    return node;
  }

  search(key) {
    return this._search(this.root, key);
  }

  _search(node, key) {
    if (!node || node.key === key) return node;
    if (key < node.key) {
      return this._search(node.left, key);
    }
    return this._search(node.right, key);
  }
}`,

  java: `class Node {
    int key;
    Node left, right;
    Node(int key) {
        this.key = key;
        left = right = null;
    }
}

class BST {
    Node root;
    
    void insert(int key) {
        root = insertRec(root, key);
    }
    
    Node insertRec(Node node, int key) {
        if (node == null) return new Node(key);
        if (key < node.key)
            node.left = insertRec(node.left, key);
        else
            node.right = insertRec(node.right, key);
        return node;
    }
    
    Node search(int key) {
        return searchRec(root, key);
    }
    
    Node searchRec(Node node, int key) {
        if (node == null || node.key == key)
            return node;
        if (key < node.key)
            return searchRec(node.left, key);
        return searchRec(node.right, key);
    }
}`,

  cpp: `struct Node {
    int key;
    Node *left, *right;
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

class BST {
    Node* root;
    
    Node* insertRec(Node* node, int key) {
        if (!node) return new Node(key);
        if (key < node->key)
            node->left = insertRec(node->left, key);
        else
            node->right = insertRec(node->right, key);
        return node;
    }
    
    Node* searchRec(Node* node, int key) {
        if (!node || node->key == key)
            return node;
        if (key < node->key)
            return searchRec(node->left, key);
        return searchRec(node->right, key);
    }
    
public:
    BST() : root(nullptr) {}
    
    void insert(int key) {
        root = insertRec(root, key);
    }
    
    Node* search(int key) {
        return searchRec(root, key);
    }
};`
};

class TreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

const TreeVisualizer = ({ type }) => {
  const canvasRef = useRef(null);
  const [root, setRoot] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const buildSampleTree = () => {
      const node50 = new TreeNode(50);
      const node30 = new TreeNode(30);
      const node70 = new TreeNode(70);
      const node20 = new TreeNode(20);
      const node40 = new TreeNode(40);
      const node60 = new TreeNode(60);
      const node80 = new TreeNode(80);

      node50.left = node30;
      node50.right = node70;
      node30.left = node20;
      node30.right = node40;
      node70.left = node60;
      node70.right = node80;

      return node50;
    };
    setRoot(buildSampleTree());
  }, []);

  const calculatePositions = (node, x, y, level, minGap) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    const gap = minGap / Math.pow(1.4, level);
    calculatePositions(node.left, x - gap, y + 70, level + 1, minGap);
    calculatePositions(node.right, x + gap, y + 70, level + 1, minGap);
  };

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
      
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim() || '#1a1a2e';
      ctx.fillRect(0, 0, width, height);
      
      if (!root) return;
      
      calculatePositions(root, width / 2, 60, 0, width / 3);
      
      const drawConnections = (node) => {
        if (!node) return;
        if (node.left) {
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(node.left.x, node.left.y);
          ctx.stroke();
          drawConnections(node.left);
        }
        if (node.right) {
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(node.right.x, node.right.y);
          ctx.stroke();
          drawConnections(node.right);
        }
      };
      drawConnections(root);
      
      const drawNode = (node) => {
        if (!node) return;
        const radius = 22;
        const isActive = activeNode === node;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        if (isActive) {
          ctx.fillStyle = '#6366f1';
        } else {
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim() || '#16162a';
        }
        ctx.fill();
        
        ctx.strokeStyle = isActive ? '#8b5cf6' : '#6366f1';
        ctx.lineWidth = isActive ? 3 : 2;
        ctx.stroke();
        
        ctx.fillStyle = isActive ? '#ffffff' : getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#f8fafc';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.key.toString(), node.x, node.y);
        
        drawNode(node.left);
        drawNode(node.right);
      };
      drawNode(root);
    };
    
    draw();
    
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [root, activeNode]);

  const search = async (target) => {
    if (!root) return;
    
    let current = root;
    while (current) {
      setActiveNode(current);
      await new Promise(r => setTimeout(r, 600));
      
      if (current.key === target) {
        await new Promise(r => setTimeout(r, 500));
        setActiveNode(null);
        return;
      }
      
      if (target < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    setActiveNode(null);
  };

  const reset = () => {
    const node50 = new TreeNode(50);
    const node30 = new TreeNode(30);
    const node70 = new TreeNode(70);
    const node20 = new TreeNode(20);
    const node40 = new TreeNode(40);
    const node60 = new TreeNode(60);
    const node80 = new TreeNode(80);

    node50.left = node30;
    node50.right = node70;
    node30.left = node20;
    node30.right = node40;
    node70.left = node60;
    node70.right = node80;

    setRoot(node50);
    setActiveNode(null);
  };

  return (
    <div className="visualizer-wrapper">
      <div className="visualizer-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '350px' }} />
      </div>

      <div className="visualizer-controls">
        <button className="btn btn-primary btn-small" onClick={() => search(40)}>
          Search 40
        </button>
        <button className="btn btn-primary btn-small" onClick={() => search(60)}>
          Search 60
        </button>
        <button className="btn btn-primary btn-small" onClick={() => search(25)}>
          Search 25 (fail)
        </button>
        <button className="btn btn-small" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="complexity-grid">
        <div className="complexity-item">
          <label>Insert</label>
          <span>O(log n)</span>
        </div>
        <div className="complexity-item">
          <label>Search</label>
          <span>O(log n)</span>
        </div>
        <div className="complexity-item">
          <label>Delete</label>
          <span>O(log n)</span>
        </div>
      </div>

      <div className="operations-list">
        <span className="operation-tag">Hierarchical Data</span>
        <span className="operation-tag">Binary Search</span>
        <span className="operation-tag">Ordered Structure</span>
        <span className="operation-tag">Balanced: O(log n)</span>
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

export default TreeVisualizer;
