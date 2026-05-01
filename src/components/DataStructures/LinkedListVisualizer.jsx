import { useEffect, useRef, useState } from 'react';

const codeExamples = {
  python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node`,

  javascript: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
}`,

  java: `class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; }
}
class LinkedList {
    Node head;
    void prepend(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
}`,

  cpp: `struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};
class LinkedList {
    Node* head;
public:
    LinkedList() : head(nullptr) {}
    void prepend(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }
};`
};

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const LinkedListVisualizer = () => {
  const canvasRef = useRef(null);
  const [head, setHead] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const n1 = new ListNode(10), n2 = new ListNode(25), n3 = new ListNode(35), n4 = new ListNode(40);
    n1.next = n2; n2.next = n3; n3.next = n4;
    setHead(n1);
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
      if (!head) return;

      const nodeWidth = 70, nodeHeight = 50, gap = 60;
      let current = head, index = 0, startX = 50;
      const startY = height / 2 - nodeHeight / 2;

      while (current && index < 6) {
        const x = startX + index * (nodeWidth + gap);
        const isActive = activeNode === current;

        ctx.fillStyle = isActive ? '#6366f1' : '#16162a';
        ctx.fillRect(x, startY, nodeWidth, nodeHeight);
        ctx.strokeStyle = isActive ? '#8b5cf6' : '#6366f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, startY, nodeWidth, nodeHeight);

        ctx.fillStyle = isActive ? '#ffffff' : '#f8fafc';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(current.data.toString(), x + nodeWidth / 2, startY + nodeHeight / 2);

        if (current.next && index < 5) {
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x + nodeWidth, startY + nodeHeight / 2);
          ctx.lineTo(x + nodeWidth + gap - 10, startY + nodeHeight / 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + nodeWidth + gap - 10, startY + nodeHeight / 2 - 5);
          ctx.lineTo(x + nodeWidth + gap - 5, startY + nodeHeight / 2);
          ctx.lineTo(x + nodeWidth + gap - 10, startY + nodeHeight / 2 + 5);
          ctx.fillStyle = '#6366f1';
          ctx.fill();
        }

        current = current.next;
        index++;
      }

      if (head) {
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('HEAD', startX + nodeWidth / 2, startY - 15);
        ctx.beginPath();
        ctx.moveTo(startX + nodeWidth / 2, startY - 5);
        ctx.lineTo(startX + nodeWidth / 2, startY);
        ctx.strokeStyle = '#22c55e';
        ctx.stroke();
      }
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [head, activeNode]);

  const prepend = () => {
    const value = Math.floor(Math.random() * 90) + 10;
    const newNode = new ListNode(value);
    newNode.next = head;
    setActiveNode(newNode);
    setHead(newNode);
    setTimeout(() => setActiveNode(null), 500);
  };

  return (
    <div className="visualizer-wrapper">
      <div className="visualizer-canvas-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '300px' }} />
      </div>
      <div className="visualizer-controls">
        <button className="btn btn-primary btn-small" onClick={prepend}>Prepend</button>
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

export default LinkedListVisualizer;
