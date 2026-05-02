# DSAMaster Code Execution Backend

Docker-sandboxed code execution service supporting Python 3, Java, and C++.

## Quick Start

### Prerequisites
- Docker installed and running
- Node.js 18+

### Build and Run

```bash
cd backend

# 1. Build executor Docker image
npm run docker:build

# 2. Install dependencies
npm install

# 3. Start server
npm start
```

### Docker Compose (Recommended)

```bash
docker-compose up --build -d
```

## API

### POST /api/run

Execute code with test cases:

```json
{
  "language": "python",
  "code": "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
  "testCases": [
    { "input": [[2, 7, 11, 15], 9], "expected": [0, 1] }
  ],
  "functionName": "twoSum"
}
```

Response:
```json
{
  "results": [
    {
      "input": [[2, 7, 11, 15], 9],
      "expected": [0, 1],
      "actual": [0, 1],
      "passed": true,
      "executionTime": 45,
      "timedOut": false,
      "error": null
    }
  ],
  "allPassed": true,
  "language": "python",
  "functionName": "twoSum"
}
```

### GET /health

Health check endpoint.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3001 | Server port |
| `FRONTEND_URL` | * | CORS origin |
| `DOCKER_IMAGE` | dsa-executor:latest | Executor Docker image |

## Security Features

- Docker containers with `--network none` (no network)
- Memory limit: 128MB
- CPU limit: 1 core
- PIDs limit: 50
- 2-second execution timeout
- Read-only filesystem
- No new privileges
- Code pattern sanitization

## Supported Languages

- **Python 3** (.py files)
- **Java 17** (.java files)  
- **C++17** (.cpp files)

## Architecture

```
Frontend (React) → API Server (Express) → Docker Executor (Alpine)
                                               ↓
                                         Separate container per run
                                         Resource-limited sandbox
```
