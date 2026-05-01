export const sortingAlgorithms = [
  {
    id: 'bubblesort',
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    description: 'Simple comparison-based sorting algorithm',
    details: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    bestCase: 'O(n)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'quicksort',
    name: 'Quick Sort',
    complexity: 'O(n log n)',
    description: 'Efficient divide and conquer algorithm with pivot selection',
    details: 'Selects a pivot element and partitions the array around it, then recursively sorts the subarrays.',
    bestCase: 'O(n log n)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(log n)'
  },
  {
    id: 'mergesort',
    name: 'Merge Sort',
    complexity: 'O(n log n)',
    description: 'Stable divide and conquer sorting algorithm',
    details: 'Divides the array into halves, recursively sorts them, and then merges the sorted halves.',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'heapsort',
    name: 'Heap Sort',
    complexity: 'O(n log n)',
    description: 'In-place comparison sort using heap data structure',
    details: 'Builds a max heap from the array, then repeatedly extracts the maximum element.',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(1)'
  }
];

export const searchingAlgorithms = [
  {
    id: 'linearsearch',
    name: 'Linear Search',
    complexity: 'O(n)',
    description: 'Sequential search through elements one by one',
    details: 'Checks each element in sequence until the target is found or the end is reached.',
    bestCase: 'O(1)',
    worstCase: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'binarysearch',
    name: 'Binary Search',
    complexity: 'O(log n)',
    description: 'Efficient search in sorted arrays',
    details: 'Repeatedly divides the search interval in half, comparing the target to the middle element.',
    bestCase: 'O(1)',
    worstCase: 'O(log n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'bfs',
    name: 'BFS',
    complexity: 'O(V + E)',
    description: 'Breadth-first graph traversal',
    details: 'Explores vertices level by level, visiting all neighbors before moving to the next level.',
    bestCase: 'O(1)',
    worstCase: 'O(V + E)',
    spaceComplexity: 'O(V)'
  },
  {
    id: 'dfs',
    name: 'DFS',
    complexity: 'O(V + E)',
    description: 'Depth-first graph traversal',
    details: 'Explores as far as possible along each branch before backtracking.',
    bestCase: 'O(1)',
    worstCase: 'O(V + E)',
    spaceComplexity: 'O(V)'
  }
];
