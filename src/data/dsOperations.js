export const dsOperations = {
  "arrays": {
    "search": {
      "name": "Search",
      "desc": "Find element using linear search",
      "pseudocode": [
        "procedure SEARCH(A, n, key)",
        "    for i ← 0 to n-1 do",
        "        if A[i] = key then",
        "            return i",
        "    return -1",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "insert": {
      "name": "Insert",
      "desc": "Insert element at end",
      "pseudocode": [
        "procedure INSERT(A, n, val)",
        "    if n ≥ MAX then",
        "        return ERROR",
        "    A[n] ← val",
        "    n ← n + 1",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "delete": {
      "name": "Delete",
      "desc": "Delete element at index",
      "pseudocode": [
        "procedure DELETE(A, n, pos)",
        "    if pos < 0 or pos ≥ n then",
        "        return ERROR",
        "    for i ← pos to n-2 do",
        "        A[i] ← A[i+1]",
        "    n ← n - 1",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "params": [
        {
          "name": "index",
          "type": "number"
        }
      ]
    },
    "findMin": {
      "name": "Find Min",
      "desc": "Find minimum element",
      "pseudocode": [
        "procedure FIND_MIN(A, n)",
        "    if n = 0 then return NULL",
        "    min ← A[0]",
        "    for i ← 1 to n-1 do",
        "        if A[i] < min then",
        "            min ← A[i]",
        "    return min",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "params": []
    },
    "findMax": {
      "name": "Find Max",
      "desc": "Find maximum element",
      "pseudocode": [
        "procedure FIND_MAX(A, n)",
        "    if n = 0 then return NULL",
        "    max ← A[0]",
        "    for i ← 1 to n-1 do",
        "        if A[i] > max then",
        "            max ← A[i]",
        "    return max",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "params": []
    },
    "reverse": {
      "name": "Reverse",
      "desc": "Reverse array in-place",
      "pseudocode": [
        "procedure REVERSE(A, n)",
        "    left ← 0",
        "    right ← n - 1",
        "    while left < right do",
        "        SWAP(A[left], A[right])",
        "        left ← left + 1",
        "        right ← right - 1",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "params": []
    }
  },
  "linkedlist": {
    "insertHead": {
      "name": "Insert Head",
      "desc": "Add node at beginning",
      "pseudocode": [
        "procedure INSERT_HEAD(head, val)",
        "    newNode ← CREATE_NODE(val)",
        "    newNode.next ← head",
        "    head ← newNode",
        "    return head",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "insertTail": {
      "name": "Insert Tail",
      "desc": "Add node at end",
      "pseudocode": [
        "procedure INSERT_TAIL(head, val)",
        "    newNode ← CREATE_NODE(val)",
        "    if head = NULL then return newNode",
        "    curr ← head",
        "    while curr.next ≠ NULL do",
        "        curr ← curr.next",
        "    curr.next ← newNode",
        "    return head",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "delete": {
      "name": "Delete",
      "desc": "Delete node by value",
      "pseudocode": [
        "procedure DELETE(head, val)",
        "    if head = NULL then return NULL",
        "    if head.val = val then",
        "        return head.next",
        "    curr ← head",
        "    while curr.next ≠ NULL do",
        "        if curr.next.val = val then",
        "            curr.next ← curr.next.next",
        "            return head",
        "        curr ← curr.next",
        "    return head",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "search": {
      "name": "Search",
      "desc": "Search for value",
      "pseudocode": [
        "procedure SEARCH(head, val)",
        "    curr ← head",
        "    pos ← 0",
        "    while curr ≠ NULL do",
        "        if curr.val = val then return pos",
        "        curr ← curr.next",
        "        pos ← pos + 1",
        "    return -1",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "reverse": {
      "name": "Reverse",
      "desc": "Reverse linked list",
      "pseudocode": [
        "procedure REVERSE(head)",
        "    prev ← NULL",
        "    curr ← head",
        "    while curr ≠ NULL do",
        "        next ← curr.next",
        "        curr.next ← prev",
        "        prev ← curr",
        "        curr ← next",
        "    return prev",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "params": []
    }
  },
  "stack": {
    "push": {
      "name": "Push",
      "desc": "Push element",
      "pseudocode": [
        "procedure PUSH(S, val)",
        "    if S.top = MAX-1 then",
        "        return OVERFLOW",
        "    S.top ← S.top + 1",
        "    S.data[S.top] ← val",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "pop": {
      "name": "Pop",
      "desc": "Pop top element",
      "pseudocode": [
        "procedure POP(S)",
        "    if S.top = -1 then",
        "        return UNDERFLOW",
        "    val ← S.data[S.top]",
        "    S.top ← S.top - 1",
        "    return val",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "params": []
    },
    "peek": {
      "name": "Peek",
      "desc": "View top element",
      "pseudocode": [
        "procedure PEEK(S)",
        "    if S.top = -1 then",
        "        return UNDERFLOW",
        "    return S.data[S.top]",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3
      ],
      "params": []
    },
    "isEmpty": {
      "name": "Is Empty",
      "desc": "Check if empty",
      "pseudocode": [
        "procedure IS_EMPTY(S)",
        "    return S.top = -1",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2
      ],
      "params": []
    }
  },
  "queue": {
    "enqueue": {
      "name": "Enqueue",
      "desc": "Add to rear",
      "pseudocode": [
        "procedure ENQUEUE(Q, val)",
        "    if Q.rear = MAX-1 then",
        "        return OVERFLOW",
        "    Q.rear ← Q.rear + 1",
        "    Q.data[Q.rear] ← val",
        "    if Q.front = -1 then",
        "        Q.front ← 0",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "dequeue": {
      "name": "Dequeue",
      "desc": "Remove from front",
      "pseudocode": [
        "procedure DEQUEUE(Q)",
        "    if Q.front = -1 then",
        "        return UNDERFLOW",
        "    val ← Q.data[Q.front]",
        "    if Q.front = Q.rear then",
        "        Q.front ← -1",
        "        Q.rear ← -1",
        "    else",
        "        Q.front ← Q.front + 1",
        "    return val",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "params": []
    },
    "peek": {
      "name": "Peek",
      "desc": "View front element",
      "pseudocode": [
        "procedure PEEK(Q)",
        "    if Q.front = -1 then",
        "        return UNDERFLOW",
        "    return Q.data[Q.front]",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3
      ],
      "params": []
    },
    "isEmpty": {
      "name": "Is Empty",
      "desc": "Check if empty",
      "pseudocode": [
        "procedure IS_EMPTY(Q)",
        "    return Q.front = -1",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2
      ],
      "params": []
    }
  },
  "bst": {
    "insert": {
      "name": "Insert",
      "desc": "Insert maintaining BST property",
      "pseudocode": [
        "procedure INSERT(root, val)",
        "    if root = NULL then",
        "        return CREATE_NODE(val)",
        "    if val < root.val then",
        "        root.left ← INSERT(root.left, val)",
        "    else",
        "        root.right ← INSERT(root.right, val)",
        "    return root",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "search": {
      "name": "Search",
      "desc": "Search for value",
      "pseudocode": [
        "procedure SEARCH(root, val)",
        "    if root = NULL then",
        "        return NOT_FOUND",
        "    if root.val = val then",
        "        return FOUND",
        "    if val < root.val then",
        "        return SEARCH(root.left, val)",
        "    else",
        "        return SEARCH(root.right, val)",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "findMin": {
      "name": "Find Min",
      "desc": "Find minimum value",
      "pseudocode": [
        "procedure FIND_MIN(root)",
        "    if root = NULL then",
        "        return NULL",
        "    while root.left ≠ NULL do",
        "        root ← root.left",
        "    return root.val",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "params": []
    },
    "findMax": {
      "name": "Find Max",
      "desc": "Find maximum value",
      "pseudocode": [
        "procedure FIND_MAX(root)",
        "    if root = NULL then",
        "        return NULL",
        "    while root.right ≠ NULL do",
        "        root ← root.right",
        "    return root.val",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "params": []
    }
  },
  "avl": {
    "insert": {
      "name": "Insert",
      "desc": "Insert with auto-balancing",
      "pseudocode": [
        "procedure INSERT(node, val)",
        "    if node = NULL then",
        "        return CREATE_NODE(val)",
        "    if val < node.val then",
        "        node.left ← INSERT(node.left, val)",
        "    else",
        "        node.right ← INSERT(node.right, val)",
        "    UPDATE_HEIGHT(node)",
        "    balance ← GET_BALANCE(node)",
        "    if balance > 1 then",
        "        if val < node.left.val then",
        "            return ROTATE_RIGHT(node)",
        "    return node",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "search": {
      "name": "Search",
      "desc": "Search in AVL tree",
      "pseudocode": [
        "procedure SEARCH(root, val)",
        "    if root = NULL then",
        "        return NOT_FOUND",
        "    if root.val = val then",
        "        return FOUND",
        "    if val < root.val then",
        "        return SEARCH(root.left, val)",
        "    else",
        "        return SEARCH(root.right, val)",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    }
  },
  "heap": {
    "insert": {
      "name": "Insert",
      "desc": "Insert with bubble-up",
      "pseudocode": [
        "procedure INSERT(H, val)",
        "    H.n ← H.n + 1",
        "    i ← H.n - 1",
        "    H.data[i] ← val",
        "    while i > 0 do",
        "        parent ← (i-1) / 2",
        "        if H.data[parent] ≥ H.data[i] then break",
        "        SWAP(H.data[parent], H.data[i])",
        "        i ← parent",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "params": [
        {
          "name": "value",
          "type": "number"
        }
      ]
    },
    "extractMax": {
      "name": "Extract Max",
      "desc": "Remove and return max",
      "pseudocode": [
        "procedure EXTRACT_MAX(H)",
        "    if H.n = 0 then",
        "        return UNDERFLOW",
        "    maxVal ← H.data[0]",
        "    H.data[0] ← H.data[H.n-1]",
        "    H.n ← H.n - 1",
        "    HEAPIFY_DOWN(H, 0)",
        "    return maxVal",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "params": []
    },
    "getMax": {
      "name": "Get Max",
      "desc": "View maximum element",
      "pseudocode": [
        "procedure GET_MAX(H)",
        "    if H.n = 0 then",
        "        return UNDERFLOW",
        "    return H.data[0]",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3
      ],
      "params": []
    }
  },
  "graph": {
    "bfs": {
      "name": "BFS",
      "desc": "Breadth-first traversal",
      "pseudocode": [
        "procedure BFS(G, start)",
        "    visited ← SET()",
        "    queue ← [start]",
        "    visited.ADD(start)",
        "    while queue ≠ empty do",
        "        v ← queue.REMOVE_FIRST()",
        "        for each neighbor u of v do",
        "            if u ∉ visited then",
        "                visited.ADD(u)",
        "                queue.ADD(u)",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "params": [
        {
          "name": "start",
          "type": "string"
        }
      ]
    },
    "dfs": {
      "name": "DFS",
      "desc": "Depth-first traversal",
      "pseudocode": [
        "procedure DFS(G, start)",
        "    visited ← SET()",
        "    stack ← [start]",
        "    while stack ≠ empty do",
        "        v ← stack.POP()",
        "        if v ∉ visited then",
        "            visited.ADD(v)",
        "            for each neighbor u of v do",
        "                if u ∉ visited then",
        "                    stack.PUSH(u)",
        "end procedure"
      ],
      "steps": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "params": [
        {
          "name": "start",
          "type": "string"
        }
      ]
    }
  }
};
