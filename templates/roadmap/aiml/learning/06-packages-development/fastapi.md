# fastapi-simple-ratelimit

Creating, Testing, and Publishing a Rate-Limit Package for FastAPI

---

## 1. What You Are Building

You are building a **reusable Python package** that:

* Integrates with **FastAPI**
* Provides request rate limiting
* Can be installed using `pip`
* Can be reused across multiple FastAPI projects
* Works as a FastAPI dependency
* Enforces request limits per client (IP-based)
* Returns HTTP 429 when the limit is exceeded

After installation, users will be able to write:

```python
from fastapi_simple_ratelimit import RateLimiter
```

And apply it to routes.

---

## 2. Why Build a Rate-Limit Package Instead of Copying Code

Rate limiting is a **cross-cutting concern**.

Copy-pasting rate-limit code across projects causes:

* Inconsistent behavior
* Harder maintenance
* Bug duplication

A package provides:

* Reusability
* Single source of truth
* Easier upgrades
* Cleaner FastAPI applications

Typical use cases:

* Public APIs
* Authentication endpoints
* Login protection
* Internal microservices
* Abuse prevention

---

## 3. Design Decision: Dependency-Based Rate Limiting

FastAPI allows rate limiting via:

* Middleware
* Dependencies

This package uses **dependency-based rate limiting**.

Why dependency-based:

* Can be applied per route
* Different limits per endpoint
* Explicit and readable
* Easier to customize

---

## 4. Prerequisites

Ensure the following are installed:

* Python 3.9 or higher
* pip
* Virtual environment support
* Internet access
* PyPI account (for publishing)

Verify:

```
python --version
pip --version
```

---

## 5. Create Project Directory

Create the root folder:

```
mkdir fastapi-simple-ratelimit
cd fastapi-simple-ratelimit
```

This directory will contain:

* Package source code
* Packaging metadata
* Documentation
* Build configuration

---

## 6. Create and Activate Virtual Environment

Create:

```
python -m venv venv
```

Activate:

macOS / Linux:

```
source venv/bin/activate
```

Windows:

```
venv\Scripts\activate
```

Why this is required:

* Prevents dependency conflicts
* Keeps system Python clean
* Ensures reproducible builds

---

## 7. Install Required Tools and Dependencies

Inside the virtual environment:

```
pip install --upgrade pip setuptools wheel build twine fastapi uvicorn
```

Explanation:

* setuptools, wheel, build: packaging tools
* twine: upload to PyPI
* fastapi: framework dependency
* uvicorn: local testing server

---

## 8. Decide Package Name and Import Name

Use two names:

* PyPI name: `fastapi-simple-ratelimit`
* Import name: `fastapi_simple_ratelimit`

Reason:

* PyPI allows hyphens
* Python imports do not allow hyphens

---

## 9. Final Project Structure

Your directory must look exactly like this:

```
fastapi-simple-ratelimit/
│
├── fastapi_simple_ratelimit/
│   ├── __init__.py
│   ├── limiter.py
│   └── storage.py
│
├── pyproject.toml
├── README.md
├── LICENSE
└── .gitignore
```

This structure follows Python packaging standards.

---

## 10. Choose Rate Limiting Strategy

This package uses:

* In-memory storage
* Fixed window algorithm
* Client IP as the key

Why this strategy:

* Simple to understand
* No external dependencies
* Good for single-instance deployments
* Ideal for learning and small services

---

## 11. Implement Storage Logic

File: `fastapi_simple_ratelimit/storage.py`

```python
import time
from typing import Dict, Tuple

class InMemoryStorage:
    def __init__(self):
        self._store: Dict[str, Tuple[int, float]] = {}

    def increment(self, key: str, limit: int, window: int) -> bool:
        current_time = time.time()

        count, reset_time = self._store.get(
            key,
            (0, current_time + window)
        )

        if current_time > reset_time:
            count = 0
            reset_time = current_time + window

        count += 1
        self._store[key] = (count, reset_time)

        return count <= limit
```

Explanation:

* Stores request count and expiry timestamp
* Resets count after window expires
* Returns whether request is allowed

---

## 12. Implement RateLimiter Dependency

File: `fastapi_simple_ratelimit/limiter.py`

```python
from fastapi import Request, HTTPException, status
from .storage import InMemoryStorage

class RateLimiter:
    def __init__(self, limit: int, window: int):
        self.limit = limit
        self.window = window
        self.storage = InMemoryStorage()

    async def __call__(self, request: Request):
        client_ip = request.client.host

        allowed = self.storage.increment(
            key=client_ip,
            limit=self.limit,
            window=self.window
        )

        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded"
            )
```

Explanation:

* Acts as a FastAPI dependency
* Identifies client by IP
* Raises HTTP 429 when limit is exceeded

---

## 13. Package Initialization File

File: `fastapi_simple_ratelimit/__init__.py`

```python
from .limiter import RateLimiter

__all__ = ["RateLimiter"]
```

Purpose:

* Exposes public API
* Enables clean imports

---

## 14. Create README.md

File: `README.md`

```
# fastapi-simple-ratelimit

A lightweight rate limiting dependency for FastAPI.

Installation:
pip install fastapi-simple-ratelimit

Usage:

from fastapi import FastAPI, Depends
from fastapi_simple_ratelimit import RateLimiter

app = FastAPI()

@app.get("/limited", dependencies=[Depends(RateLimiter(limit=5, window=60))])
def limited_route():
    return {"message": "Allowed"}
```

Why README is required:

* Mandatory for PyPI
* Acts as package homepage
* Explains usage clearly

---

## 15. Create pyproject.toml

File: `pyproject.toml`

```toml
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "fastapi-simple-ratelimit"
version = "0.1.0"
description = "Simple rate limiting dependency for FastAPI"
readme = "README.md"
requires-python = ">=3.9"

dependencies = [
  "fastapi"
]

authors = [
  { name = "Vijay", email = "your-email@example.com" }
]

license = { text = "MIT" }

classifiers = [
  "Framework :: FastAPI",
  "Programming Language :: Python :: 3",
  "License :: OSI Approved :: MIT License"
]

[tool.setuptools.packages.find]
where = ["."]
```

---

## 16. Create LICENSE File

Use the full MIT License text.

Purpose:

* Legal permission for reuse
* Required by many organizations

---

## 17. Create .gitignore

```
__pycache__/
build/
dist/
*.egg-info/
venv/
.env
```

---

## 18. How to Test the Package Locally

### 18.1 Create Test Application

Create a file in the root directory:

```
test_app.py
```

Add:

```python
from fastapi import FastAPI, Depends
from fastapi_simple_ratelimit import RateLimiter

app = FastAPI()

@app.get("/limited")
def limited_endpoint(
    _=Depends(RateLimiter(limit=3, window=10))
):
    return {"message": "Request allowed"}
```

---

### 18.2 Run the Server

```
uvicorn test_app:app --reload
```

---

### 18.3 Test Behavior

Send requests repeatedly to:

```
http://127.0.0.1:8000/limited
```

Expected:

* First 3 requests succeed
* 4th request returns HTTP 429
* After 10 seconds, requests succeed again

---

### 18.4 Test Installation Simulation

```
pip install .
uvicorn test_app:app --reload
```

This confirms packaging correctness.

---

## 19. Build the Package

```
python -m build
```

Output:

```
dist/
    fastapi_simple_ratelimit-0.1.0-py3-none-any.whl
    fastapi-simple-ratelimit-0.1.0.tar.gz
```

---

## 20. Publish to PyPI

Create PyPI account and API token.

Upload:

```
twine upload dist/*
```

Login:

* Username: **token**
* Password: API token

---

## 21. Use the Published Package

```
pip install fastapi-simple-ratelimit
```

Example:

```python
from fastapi_simple_ratelimit import RateLimiter
```

---

## 22. Versioning Rules

Every release must increment version:

```
version = "0.1.1"
```

Reason:

* PyPI forbids overwriting versions
* Follows semantic versioning

---

## 23. Limitations of This Version

* In-memory storage
* Not suitable for multiple workers
* No Redis support

These are intentional for simplicity.

---

## 24. Possible Enhancements

* Redis backend
* Sliding window algorithm
* Header-based keys
* Middleware support
* Custom response headers

---

## 25. Final Summary

You now have a complete understanding of:

* Designing a FastAPI rate-limit package
* Implementing dependency-based rate limiting
* Structuring a professional Python package
* Testing locally with FastAPI
* Building and publishing to PyPI
* Understanding real-world limitations

---

If you want next, I can provide:

* Redis-based distributed rate limiter
* Middleware version
* Async-safe implementation
* Production readiness checklist
* Comparison with existing libraries like slowapi
