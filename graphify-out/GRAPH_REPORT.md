# Graph Report - dsa-source-code  (2026-05-01)

## Corpus Check
- 32 files · ~23,507 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 66 nodes · 40 edges · 4 communities detected
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]

## God Nodes (most connected - your core abstractions)
1. `useProgress()` - 5 edges
2. `Navbar()` - 3 edges
3. `useTheme()` - 2 edges
4. `Problems()` - 2 edges
5. `TreeNode` - 2 edges
6. `ListNode` - 2 edges
7. `DataStructureDetail()` - 2 edges
8. `AlgorithmDetail()` - 2 edges
9. `Progress()` - 2 edges
10. `useScrollspy()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `useProgress()` --calls--> `Problems()`  [INFERRED]
  src/contexts/ProgressContext.jsx → src/components/Problems/Problems.jsx
- `useProgress()` --calls--> `DataStructureDetail()`  [INFERRED]
  src/contexts/ProgressContext.jsx → src/components/DataStructures/DataStructureDetail.jsx
- `useProgress()` --calls--> `AlgorithmDetail()`  [INFERRED]
  src/contexts/ProgressContext.jsx → src/components/Algorithms/AlgorithmDetail.jsx
- `useProgress()` --calls--> `Progress()`  [INFERRED]
  src/contexts/ProgressContext.jsx → src/components/Progress/Progress.jsx
- `useTheme()` --calls--> `Navbar()`  [INFERRED]
  src/contexts/ThemeContext.jsx → src/components/Navbar.jsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.17
Nodes (5): AlgorithmDetail(), useProgress(), DataStructureDetail(), Problems(), Progress()

### Community 1 - "Community 1"
Cohesion: 0.29
Nodes (3): Navbar(), useTheme(), useScrollspy()

### Community 2 - "Community 2"
Cohesion: 0.5
Nodes (1): TreeNode

### Community 3 - "Community 3"
Cohesion: 0.5
Nodes (1): ListNode

## Knowledge Gaps
- **Thin community `Community 2`** (4 nodes): `TreeNode`, `.constructor()`, `TreeVisualizer()`, `TreeVisualizer.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 3`** (4 nodes): `LinkedListVisualizer()`, `ListNode`, `.constructor()`, `LinkedListVisualizer.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 4 inferred relationships involving `useProgress()` (e.g. with `Problems()` and `DataStructureDetail()`) actually correct?**
  _`useProgress()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Navbar()` (e.g. with `useTheme()` and `useScrollspy()`) actually correct?**
  _`Navbar()` has 2 INFERRED edges - model-reasoned connections that need verification._