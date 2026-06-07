## Why is FastAPI faster than Flask and Django REST?

### Answer

FastAPI is faster because:

1. ASGI-based (not WSGI)
2. Built on Starlette (async web framework)
3. Uses async/await for non-blocking I/O
4. Runs on Uvicorn (uvloop + httptools)
5. Uses Pydantic for fast validation (C-extensions)

Flask & Django REST are sync-first, requiring thread workers per request.

---

## What is ASGI and how does it differ from WSGI?

### Answer

* WSGI: synchronous, one request per thread
* ASGI: asynchronous, supports:

  * WebSockets
  * Background tasks
  * Long polling
  * Async I/O

ASGI allows a single worker to handle thousands of concurrent connections.

---

## Explain FastAPI request lifecycle

### Answer

Order of execution:

1. ASGI server receives request
2. Middleware executes (top-down)
3. Dependencies resolved (top-down)
4. Request body validated (Pydantic)
5. Route handler runs
6. Response model validation
7. Middleware response phase (bottom-up)

Understanding this is crucial for auth, caching, logging.

---

## Dependency Injection vs Middleware — when to use what?

### Answer

| Use Case             | Dependency | Middleware |
| -------------------- | ---------- | ---------- |
| Auth                 | Yes        | No         |
| DB session           | Yes        | No         |
| Request timing       | No         | Yes        |
| Logging              | No         | Yes        |
| Rate limit per route | Yes        | No         |
| Global headers       | No         | Yes        |

Dependencies are request-scoped and testable.
Middleware is global and unconditional.

---

## How does FastAPI handle request validation?

### Answer

* Uses Pydantic models
* Validates:

  * Request body
  * Path params
  * Query params
  * Headers
* Invalid input returns 422 Unprocessable Entity
* Validation happens before route execution

This eliminates manual validation logic.

---

## What are response models and why are they critical?

### Answer

Response models:

* Prevent leaking sensitive fields
* Enforce API contracts
* Auto-generate OpenAPI schemas

Example: password fields are automatically excluded.

This is security, documentation, and correctness combined.

---

## How do you implement JWT authentication properly?

### Answer

Correct approach:

* OAuth2PasswordBearer
* Access token (short-lived)
* Refresh token (long-lived)
* Store secrets securely
* Validate token via dependency

Never:
Store JWT in localStorage for browsers
Use long-lived access tokens

---

## How does FastAPI support async database operations?

### Answer

* Async DB drivers (asyncpg, aiomysql)
* SQLAlchemy async sessions
* Event loop handles DB I/O without blocking

Blocking DB calls freeze the event loop and kill performance.

---

## What happens if you use blocking code in FastAPI?

### Answer

Blocking code:

* Freezes the event loop
* Stops other requests
* Reduces throughput to one request at a time

Solution:

* Use async libraries
* Offload CPU-heavy tasks to workers
* Use background jobs

---

## How do you scale FastAPI?

### Answer

Scaling strategy:

1. Multiple Uvicorn workers
2. Load balancer (Nginx / ALB)
3. Stateless app design
4. Shared cache (Redis)
5. DB connection pooling

FastAPI scales horizontally, not vertically.

---

## How does FastAPI handle background tasks?

### Answer

* Lightweight tasks: BackgroundTasks
* Heavy or reliable tasks:

  * Celery
  * RQ
  * Dramatiq

BackgroundTasks run after response, not for heavy jobs.

---

## How do you handle global errors in FastAPI?

### Answer

* Raise HTTPException for expected errors
* Use custom exception handlers for domain errors
* Centralize error formatting

This keeps controllers clean and consistent.

---

## How do you secure a FastAPI application?

### Answer

Security checklist:

* HTTPS only
* JWT expiration
* Rate limiting
* CORS restrictions
* Input validation
* Secrets in env or vault
* SQL injection prevention
* Proper logging without secrets

---

## How does FastAPI generate Swagger docs?

### Answer

* Uses Python type hints
* Pydantic schemas map to OpenAPI
* Decorators add HTTP metadata
* Auto UI via Swagger and ReDoc

Docs are always in sync with code.

---

## How do you test FastAPI apps?

### Answer

* pytest
* httpx TestClient
* Dependency overrides
* Separate test DB

Testing dependencies is easy due to dependency injection.

---

## How do you deploy FastAPI in production?

### Answer

Best practices:

* Uvicorn workers
* Behind Nginx
* Dockerized
* Health checks
* Graceful shutdown
* Rolling deployments

Never:
Run with --reload in production

---

## How does FastAPI compare to Django REST Framework?

### Answer

| FastAPI       | DRF              |
| ------------- | ---------------- |
| Async-first   | Sync-first       |
| Type hints    | Serializer-based |
| Faster        | Slower           |
| Minimal       | Heavy            |
| Microservices | Monolith         |

Use DRF for large monoliths, FastAPI for modern APIs.

---

## What is uvicorn and uvloop?

### Answer

* Uvicorn: ASGI server
* uvloop: ultra-fast event loop based on libuv

Together they deliver high throughput.

---

## How do you implement rate limiting?

### Answer

* Redis-based limiter
* Per-IP or per-user
* Use dependencies for per-route limits

Never rely on in-memory counters in production.

---

## When would you NOT use FastAPI?

### Answer

* Heavy synchronous CPU workloads
* Legacy Django monolith
* Teams unfamiliar with async Python
* Extremely simple CRUD apps where Flask suffices

---

# ARCHITECT-LEVEL QUESTIONS

### How would you design a multi-tenant FastAPI SaaS?

**Answer:**

* Tenant-aware middleware
* Tenant ID via JWT
* Isolated schemas or databases
* Caching per tenant
* Rate limits per tenant

---

### How do you handle schema migrations safely?

**Answer:**

* Alembic
* Backward-compatible changes
* Blue-green deployments
* Feature flags

---

### How do you observe FastAPI in production?

**Answer:**

* Structured logs
* Metrics using Prometheus
* Tracing with OpenTelemetry
* Error tracking with Sentry

---

## FINAL INTERVIEW CHECKLIST

You’re senior-ready if you can:

* Explain async vs sync clearly
* Justify dependency injection vs middleware
* Design secure authentication
* Scale horizontally
* Debug production issues
* Write testable APIs
* Make architectural trade-offs

---

# FastAPI System Design – Interview Q&A (Senior Level)

---

## Design a scalable REST API using FastAPI

### Expected Answer

High-level architecture:

* FastAPI (ASGI)
* Uvicorn with multiple workers
* Stateless services
* PostgreSQL as primary database
* Redis for cache and rate limiting
* Load balancer (Nginx / ALB)

Key FastAPI decisions:

* Async endpoints only
* Pydantic models for validation
* Dependency injection for DB sessions
* Response models for contracts

Scaling strategy:

* Horizontal scaling
* DB connection pooling
* Redis shared state

Why FastAPI fits:
Async, lightweight, and auto documentation make it ideal for high-throughput APIs.

---

## How would you design authentication and authorization?

### Expected Answer

Auth flow:

1. OAuth2 Password Flow
2. JWT access token (short-lived)
3. Refresh token (long-lived)
4. Role-based access via dependencies

FastAPI-specific design:

* OAuth2PasswordBearer
* Auth as dependency
* Role checks as dependency
* Swagger supports auth automatically

Security considerations:

* Token expiry
* Rotation
* HTTPS only
* Redis for token revocation (optional)

---

## Design a multi-tenant FastAPI SaaS backend

### Expected Answer

Tenant identification:

* Tenant ID in JWT
* Subdomain-based routing
* Request header

Isolation strategies:

* Single DB with tenant_id column
* Separate schemas per tenant
* Separate DB per tenant

FastAPI usage:

* Tenant resolution dependency
* Inject tenant context into services
* Per-tenant rate limiting and caching

Key risk:
Cross-tenant data leakage, solved by dependency-based enforcement.

---

## How do you handle high read traffic?

### Expected Answer

Caching layers:

* Redis application cache
* HTTP caching headers
* CDN for public APIs

FastAPI design:

* Cache dependency
* Cache invalidation on writes
* Async Redis client

Trade-offs:

* Strong consistency vs performance
* TTL-based invalidation

---

## How would you design rate limiting?

### Expected Answer

Design:

* Redis-backed token bucket
* Per-IP or per-user limits
* Dependency-based enforcement

Why dependency instead of middleware:

* Route-specific limits
* User-aware limits
* Easier testing

Never do:
In-memory counters
Per-instance limits only

---

## Design a file upload and processing system

### Expected Answer

Flow:

1. Client uploads file to FastAPI
2. Store file in object storage
3. Trigger background job
4. Process asynchronously
5. Update status in database

FastAPI tools:

* UploadFile
* BackgroundTasks for light work
* Celery or RQ for heavy work

Why async matters:
File uploads are I/O heavy.

---

## How would you design background job processing?

### Expected Answer

Separation of concerns:

* API handled by FastAPI
* Workers handled by Celery or Dramatiq
* Broker using Redis or RabbitMQ

FastAPI role:

* Enqueue jobs
* Track job status
* Expose job APIs

Design principle:
APIs should respond fast while jobs do slow work.

---

## How do you ensure database safety and migrations?

### Expected Answer

Strategy:

* Alembic migrations
* Backward-compatible schema changes
* Blue-green deployments

FastAPI integration:

* DB session per request via dependency
* Connection pooling

Avoid:

* Auto-migrations on startup
* Long blocking migrations

---

## Design an API versioning strategy

### Expected Answer

Options:

* Path-based versioning (/api/v1, /api/v2)
* Header-based versioning
* Subdomain versioning

FastAPI usage:

* Versioned routers
* Shared schemas where possible

Goal:
Backward compatibility without breaking clients.

---

## How do you handle observability in production?

### Expected Answer

Three pillars:

1. Structured logs
2. Metrics using Prometheus
3. Tracing using OpenTelemetry

FastAPI advantages:

* Middleware-based request tracing
* Dependency-level logging
* Easy OpenTelemetry integration

---

## Design a microservices architecture with FastAPI

### Expected Answer

Architecture:

* API Gateway
* Multiple FastAPI services
* Shared authentication service
* Event-driven communication

Communication:

* HTTP for synchronous calls
* Kafka or RabbitMQ for asynchronous events

FastAPI benefits:

* Lightweight services
* Fast startup
* Async I/O friendly

---

## How do you prevent event loop blocking?

### Expected Answer

Rules:

* No synchronous DB calls
* No CPU-heavy work
* No blocking libraries

Solutions:

* Async libraries
* ThreadPoolExecutor for CPU-bound tasks
* Background workers

Blocking code silently destroys FastAPI performance.

---

## Design a real-time feature such as notifications or chat

### Expected Answer

Options:

* WebSockets
* Server-Sent Events
* Pub/Sub backend

Scaling strategy:

* Redis Pub/Sub
* Sticky sessions
* Message broker

---

## How do you secure FastAPI at scale?

### Expected Answer

Security layers:

* TLS
* Authentication and RBAC
* Rate limiting
* Input validation
* Secrets management
* Web application firewall

FastAPI strength:
Validation and dependency injection reduce attack surface.

---

## Design CI/CD for FastAPI

### Expected Answer

Pipeline:

1. Lint and tests
2. Build Docker image
3. Run migrations
4. Deploy
5. Health check
6. Rollback if needed

Best practices:

* Immutable builds
* Zero downtime deployments
* Feature flags

---

## How do you handle schema evolution without breaking clients?

### Expected Answer

* Never remove fields
* Add optional fields
* Version APIs
* Deprecate gradually

Pydantic helps maintain backward compatibility.

---

## When would FastAPI be a bad choice?

### Expected Answer

* CPU-heavy workloads
* Teams unfamiliar with async Python
* Large Django monoliths
* Extremely simple scripts

Good engineers know when not to use a tool.

---

# HOW INTERVIEWERS EVALUATE YOU

They look for:

* Async awareness
* Trade-off thinking
* Failure handling
* Scalability
* Security-first mindset
* Clean abstractions

---

## Senior-Level Signals

You pass if you can:

* Draw architecture
* Explain scaling
* Prevent data leaks
* Justify decisions
* Handle failures
* Design for growth