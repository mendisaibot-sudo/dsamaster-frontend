import { FaTh, FaLink, FaLayerGroup, FaStream, FaSitemap, FaProjectDiagram, FaSortAmountUp, FaNetworkWired } from 'react-icons/fa';

export const dataStructures = [
  { id: 'arrays', name: 'Arrays', description: 'Fixed-size sequential collection of elements', details: 'An array is a linear data structure that stores elements in contiguous memory locations. Elements are accessed by index, allowing O(1) random access.', icon: FaTh, color: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
  { id: 'linkedlist', name: 'Linked List', description: 'Dynamic collection of nodes linked together', details: 'A linked list consists of nodes containing data and a reference to the next node. Enables dynamic size and efficient insertions/deletions.', icon: FaLink, color: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' },
  { id: 'stack', name: 'Stack', description: 'LIFO - Last In, First Out data structure', details: 'A stack follows LIFO principle. The last element added is the first one removed. Operations: push and pop.', icon: FaLayerGroup, color: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)' },
  { id: 'queue', name: 'Queue', description: 'FIFO - First In, First Out data structure', details: 'A queue follows FIFO principle. The first element added is the first one removed. Operations: enqueue and dequeue.', icon: FaStream, color: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' },
  { id: 'bst', name: 'Binary Search Tree', description: 'Hierarchical structure with ordered nodes', details: 'Each node has at most two children. Left subtree < parent, right subtree > parent.', icon: FaSitemap, color: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)' },
  { id: 'avl', name: 'AVL Tree', description: 'Self-balancing binary search tree', details: 'Height difference between subtrees is at most 1. Ensures O(log n) operations.', icon: FaProjectDiagram, color: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' },
  { id: 'heap', name: 'Heap', description: 'Complete binary tree with heap property', details: 'Parent is greater (max-heap) or smaller (min-heap) than children. Used in priority queues.', icon: FaSortAmountUp, color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
  { id: 'graph', name: 'Graph', description: 'Collection of vertices and edges', details: 'Vertices connected by edges. Models networks, relationships, and paths.', icon: FaNetworkWired, color: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)' }
];

export const dsComplexity = {
  arrays: { access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', space: 'O(n)' },
  linkedlist: { access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
  stack: { access: 'O(n)', search: 'O(n)', push: 'O(1)', pop: 'O(1)', peek: 'O(1)', space: 'O(n)' },
  queue: { access: 'O(n)', search: 'O(n)', enqueue: 'O(1)', dequeue: 'O(1)', peek: 'O(1)', space: 'O(n)' },
  bst: { search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
  avl: { search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
  heap: { insert: 'O(log n)', extract: 'O(log n)', peek: 'O(1)', build: 'O(n)', space: 'O(n)' },
  graph: { addVertex: 'O(1)', addEdge: 'O(1)', removeVertex: 'O(V+E)', removeEdge: 'O(E)', space: 'O(V+E)' }
};
