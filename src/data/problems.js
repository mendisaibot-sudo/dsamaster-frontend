export const problems = {
  easy: [
    {
      id: 'e1',
      title: 'Two Sum',
      difficulty: 'easy',
      category: 'Arrays',
      completed: false,
      functionName: 'twoSum',
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
      starterCode: {
        javascript: `function twoSum(nums, target) {
  // Your code here
}`,
        python: `def twoSum(nums, target):
    # Your code here
    pass`,
        java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
    return new int[0];
}`,
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}`
      },
      languages: ['javascript', 'python', 'java', 'cpp'],
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] }
      ],
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ]
    },
    {
      id: 'e2',
      title: 'Valid Parentheses',
      difficulty: 'easy',
      category: 'Stacks',
      completed: false,
      functionName: 'isValid',
      description: `Given a string s containing just the characters (, ), {, }, [ and ]. Determine if the input string is valid. A string is valid if open brackets are closed by the same type of brackets and in the correct order.`,
      starterCode: `function isValid(s) {
  // Your code here
}`,
      testCases: [
        { input: ['()'], expected: true },
        { input: ['()[]{}'], expected: true },
        { input: ['(]'], expected: false }
      ],
      examples: [
        { input: 's = "()"', output: 'true', explanation: '' }
      ],
      constraints: ['1 <= s.length <= 10^4']
    },
    {
      id: 'e3',
      title: 'Merge Two Sorted Lists',
      difficulty: 'easy',
      category: 'Linked Lists',
      completed: false,
      functionName: 'mergeTwoLists',
      description: `You are given the heads of two sorted linked lists. Merge the two lists into one sorted list. Return the head of the merged linked list. (Simulated with arrays for this editor.)`,
      starterCode: `function mergeTwoLists(list1, list2) {
  // Your code here
}`,
      testCases: [
        { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
        { input: [[], []], expected: [] },
        { input: [[], [0]], expected: [0] }
      ],
      examples: [
        { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: '' }
      ],
      constraints: [
        'The number of nodes in both lists is in the range [0, 50]',
        '-100 <= Node.val <= 100',
        'Both list1 and list2 are sorted in non-decreasing order.'
      ]
    },
    {
      id: 'e4',
      title: 'Maximum Subarray',
      difficulty: 'easy',
      category: 'Arrays',
      completed: false,
      functionName: 'maxSubArray',
      description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
      starterCode: `function maxSubArray(nums) {
  // Your code here
}`,
      testCases: [
        { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
        { input: [[1]], expected: 1 },
        { input: [[5, 4, -1, 7, 8]], expected: 23 }
      ],
      examples: [
        { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' }
      ],
      constraints: [
        '1 <= nums.length <= 10^5',
        '-10^4 <= nums[i] <= 10^4'
      ]
    },
    {
      id: 'e5',
      title: 'Climbing Stairs',
      difficulty: 'easy',
      category: 'Dynamic Programming',
      completed: false,
      functionName: 'climbStairs',
      description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
      starterCode: `function climbStairs(n) {
  // Your code here
}`,
      testCases: [
        { input: [2], expected: 2 },
        { input: [3], expected: 3 },
        { input: [4], expected: 5 }
      ],
      examples: [
        { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top: 1+1 and 2.' }
      ],
      constraints: ['1 <= n <= 45']
    },
    {
      id: 'e6',
      title: 'Symmetric Tree',
      difficulty: 'easy',
      category: 'Trees',
      completed: false,
      functionName: 'isSymmetric',
      description: `Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center). (Represent tree as nested arrays for editor.)`,
      starterCode: `function isSymmetric(root) {
  // Your code here: root is an array/null tree representation
}`,
      testCases: [
        { input: [[1, 2, 2, 3, 4, 4, 3]], expected: true },
        { input: [[1, 2, 2, null, 3, null, 3]], expected: false },
        { input: [[]], expected: true }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'e7',
      title: 'Diameter of Binary Tree',
      difficulty: 'easy',
      category: 'Trees',
      completed: false,
      functionName: 'diameterOfBinaryTree',
      description: `Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree. (Represent tree as array for editor.)`,
      starterCode: `function diameterOfBinaryTree(root) {
  // Your code here
}`,
      testCases: [
        { input: [[1, 2, 3, 4, 5]], expected: 3 },
        { input: [[1, 2]], expected: 1 }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'e8',
      title: 'Valid Palindrome',
      difficulty: 'easy',
      category: 'Strings',
      completed: false,
      functionName: 'isPalindrome',
      description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
      starterCode: `function isPalindrome(s) {
  // Your code here
}`,
      testCases: [
        { input: ['A man, a plan, a canal: Panama'], expected: true },
        { input: ['race a car'], expected: false },
        { input: [' '], expected: true }
      ],
      examples: [],
      constraints: ['1 <= s.length <= 2 * 10^5']
    },
    {
      id: 'e9',
      title: 'Invert Binary Tree',
      difficulty: 'easy',
      category: 'Trees',
      completed: false,
      functionName: 'invertTree',
      description: `Given the root of a binary tree, invert the tree, and return its root. (Represented as array for this editor.)`,
      starterCode: `function invertTree(root) {
  // Your code here
}`,
      testCases: [
        { input: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
        { input: [[2, 1, 3]], expected: [2, 3, 1] },
        { input: [[]], expected: [] }
      ],
      examples: [],
      constraints: ['The number of nodes in the tree is in the range [0, 100].']
    },
    {
      id: 'e10',
      title: 'Best Time to Buy/Sell Stock',
      difficulty: 'easy',
      category: 'Arrays',
      completed: false,
      functionName: 'maxProfit',
      description: `You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If you cannot achieve any profit, return 0.`,
      starterCode: `function maxProfit(prices) {
  // Your code here
}`,
      testCases: [
        { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
        { input: [[7, 6, 4, 3, 1]], expected: 0 },
        { input: [[1, 2]], expected: 1 }
      ],
      examples: [
        { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' }
      ],
      constraints: [
        '1 <= prices.length <= 10^5',
        '0 <= prices[i] <= 10^4'
      ]
    }
  ],
  medium: [
    {
      id: 'm1',
      title: '3Sum',
      difficulty: 'medium',
      category: 'Arrays',
      completed: false,
      functionName: 'threeSum',
      description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.`,
      starterCode: `function threeSum(nums) {
  // Your code here
}`,
      testCases: [
        { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
        { input: [[0, 1, 1]], expected: [] },
        { input: [[0, 0, 0]], expected: [[0, 0, 0]] }
      ],
      examples: [],
      constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5']
    },
    {
      id: 'm2',
      title: 'Binary Tree Level Order',
      difficulty: 'medium',
      category: 'Trees',
      completed: false,
      functionName: 'levelOrder',
      description: `Given the root of a binary tree, return the level order traversal of its nodes values. (Represented as array for this editor.)`,
      starterCode: `function levelOrder(root) {
  // Your code here
}`,
      testCases: [
        { input: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
        { input: [[1]], expected: [[1]] },
        { input: [[]], expected: [] }
      ],
      examples: [],
      constraints: ['The number of nodes in the tree is in the range [0, 2000].']
    },
    {
      id: 'm3',
      title: 'Longest Substring Without Repeating',
      difficulty: 'medium',
      category: 'Strings',
      completed: false,
      functionName: 'lengthOfLongestSubstring',
      description: `Given a string s, find the length of the longest substring without repeating characters.`,
      starterCode: `function lengthOfLongestSubstring(s) {
  // Your code here
}`,
      testCases: [
        { input: ['abcabcbb'], expected: 3 },
        { input: ['bbbbb'], expected: 1 },
        { input: ['pwwkew'], expected: 3 },
        { input: [''], expected: 0 }
      ],
      examples: [
        { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' }
      ],
      constraints: ['0 <= s.length <= 5 * 10^4']
    },
    {
      id: 'm4',
      title: 'Container With Most Water',
      difficulty: 'medium',
      category: 'Arrays',
      completed: false,
      functionName: 'maxArea',
      description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
      starterCode: `function maxArea(height) {
  // Your code here
}`,
      testCases: [
        { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
        { input: [[1, 1]], expected: 1 }
      ],
      examples: [],
      constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4']
    },
    {
      id: 'm5',
      title: 'Valid Sudoku',
      difficulty: 'medium',
      category: 'Arrays',
      completed: false,
      functionName: 'isValidSudoku',
      description: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: each row/column/box must contain digits 1-9 without repetition.`,
      starterCode: `function isValidSudoku(board) {
  // Your code here
}`,
      testCases: [
        { input: [[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]], expected: true },
        { input: [[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]], expected: false }
      ],
      examples: [],
      constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit or \'.\'.']
    },
    {
      id: 'm6',
      title: 'Clone Graph',
      difficulty: 'medium',
      category: 'Graphs',
      completed: false,
      functionName: 'cloneGraph',
      description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. (Represented as adjacency list for this editor.)`,
      starterCode: `function cloneGraph(adjList) {
  // Your code here
}`,
      testCases: [
        { input: [[[2, 4], [1, 3], [2, 4], [1, 3]]], expected: [[2, 4], [1, 3], [2, 4], [1, 3]] }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'm7',
      title: 'Course Schedule',
      difficulty: 'medium',
      category: 'Graphs',
      completed: false,
      functionName: 'canFinish',
      description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses.`,
      starterCode: `function canFinish(numCourses, prerequisites) {
  // Your code here
}`,
      testCases: [
        { input: [2, [[1, 0]]], expected: true },
        { input: [2, [[1, 0], [0, 1]]], expected: false }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'm8',
      title: 'Kth Largest Element',
      difficulty: 'medium',
      category: 'Heaps',
      completed: false,
      functionName: 'findKthLargest',
      description: `Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.`,
      starterCode: `function findKthLargest(nums, k) {
  // Your code here
}`,
      testCases: [
        { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
        { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'm9',
      title: 'Coin Change',
      difficulty: 'medium',
      category: 'Dynamic Programming',
      completed: false,
      functionName: 'coinChange',
      description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.`,
      starterCode: `function coinChange(coins, amount) {
  // Your code here
}`,
      testCases: [
        { input: [[1, 2, 5], 11], expected: 3 },
        { input: [[2], 3], expected: -1 },
        { input: [[1], 0], expected: 0 }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'm10',
      title: 'Number of Islands',
      difficulty: 'medium',
      category: 'Graphs',
      completed: false,
      functionName: 'numIslands',
      description: `Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
      starterCode: `function numIslands(grid) {
  // Your code here
}`,
      testCases: [
        { input: [[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]], expected: 1 },
        { input: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]], expected: 3 }
      ],
      examples: [],
      constraints: []
    }
  ],
  hard: [
    {
      id: 'h1',
      title: 'Median of Two Sorted Arrays',
      difficulty: 'hard',
      category: 'Arrays',
      completed: false,
      functionName: 'findMedianSortedArrays',
      description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).`,
      starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // Your code here
}`,
      testCases: [
        { input: [[1, 3], [2]], expected: 2.0 },
        { input: [[1, 2], [3, 4]], expected: 2.5 }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h2',
      title: 'Merge k Sorted Lists',
      difficulty: 'hard',
      category: 'Linked Lists',
      completed: false,
      functionName: 'mergeKLists',
      description: `You are given an array of k linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it. (Represented as arrays for this editor.)`,
      starterCode: `function mergeKLists(lists) {
  // Your code here
}`,
      testCases: [
        { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h3',
      title: 'Trapping Rain Water',
      difficulty: 'hard',
      category: 'Arrays',
      completed: false,
      functionName: 'trap',
      description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
      starterCode: `function trap(height) {
  // Your code here
}`,
      testCases: [
        { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
        { input: [[4, 2, 0, 3, 2, 5]], expected: 9 }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h4',
      title: 'Word Ladder',
      difficulty: 'hard',
      category: 'Graphs',
      completed: false,
      functionName: 'ladderLength',
      description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter. Return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.`,
      starterCode: `function ladderLength(beginWord, endWord, wordList) {
  // Your code here
}`,
      testCases: [
        { input: ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']], expected: 5 },
        { input: ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']], expected: 0 }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h5',
      title: 'Largest Rectangle in Histogram',
      difficulty: 'hard',
      category: 'Stacks',
      completed: false,
      functionName: 'largestRectangleArea',
      description: `Given an array of integers heights representing the histograms bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.`,
      starterCode: `function largestRectangleArea(heights) {
  // Your code here
}`,
      testCases: [
        { input: [[2, 1, 5, 6, 2, 3]], expected: 10 },
        { input: [[2, 4]], expected: 4 }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h6',
      title: 'Minimum Window Substring',
      difficulty: 'hard',
      category: 'Strings',
      completed: false,
      functionName: 'minWindow',
      description: `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string.`,
      starterCode: `function minWindow(s, t) {
  // Your code here
}`,
      testCases: [
        { input: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
        { input: ['a', 'a'], expected: 'a' },
        { input: ['a', 'aa'], expected: '' }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h7',
      title: 'Regular Expression Matching',
      difficulty: 'hard',
      category: 'Dynamic Programming',
      completed: false,
      functionName: 'isMatch',
      description: `Given an input string s and a pattern p, implement regular expression matching with support for \'.\' and \'*\' where: \'.\' Matches any single character, \'*\' Matches zero or more of the preceding element.`,
      starterCode: `function isMatch(s, p) {
  // Your code here
}`,
      testCases: [
        { input: ['aa', 'a'], expected: false },
        { input: ['aa', 'a*'], expected: true },
        { input: ['ab', '.*'], expected: true }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h8',
      title: 'LFU Cache',
      difficulty: 'hard',
      category: 'Design',
      completed: false,
      functionName: 'LFUCache',
      description: `Design and implement a data structure for a Least Frequently Used (LFU) cache. (For this editor, simulate via methods if needed, or implement core logic.)`,
      starterCode: `// Design an LFU Cache class here
// For this editor, solve a simpler sub-problem or implement get/put logic
function lfuSimulate(operations) {
  // Your approach — this is a design problem; skip automated test in editor
  return true;
}`,
      testCases: [
        { input: [[]], expected: true }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h9',
      title: 'Alien Dictionary',
      difficulty: 'hard',
      category: 'Graphs',
      completed: false,
      functionName: 'alienOrder',
      description: `There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you. You are given a list of strings words from the dictionary, where the strings in words are sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new languages rules.`,
      starterCode: `function alienOrder(words) {
  // Your code here
}`,
      testCases: [
        { input: [["wrt", "wrf", "er", "ett", "rftt"]], expected: "wertf" },
        { input: [["z", "x"]], expected: "zx" },
        { input: [["z", "x", "z"]], expected: "" }
      ],
      examples: [],
      constraints: []
    },
    {
      id: 'h10',
      title: 'Word Search II',
      difficulty: 'hard',
      category: 'Tries',
      completed: false,
      functionName: 'findWords',
      description: `Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.`,
      starterCode: `function findWords(board, words) {
  // Your code here
}`,
      testCases: [
        { input: [[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], ["oath","pea","eat","rain"]], expected: ["eat","oath"] }
      ],
      examples: [],
      constraints: []
    }
  ]
};
