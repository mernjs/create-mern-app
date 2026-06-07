## What exactly is Express.js, and what problem does it solve?

### Answer

Express.js is a **minimal, unopinionated web framework** for Node.js that abstracts:

* HTTP server creation
* Routing
* Middleware composition

It **does not** enforce architecture, ORM, validation, or auth patterns — giving flexibility but requiring discipline.

**Senior insight:**
Express is powerful **because it is simple**, but production safety depends on how *you* structure it.

---

## Explain the Express.js request–response lifecycle

### Answer

Order of execution:

1. Incoming HTTP request
2. Global middleware (`app.use`)
3. Route-level middleware
4. Route handler
5. Response middleware (if any)
6. Error-handling middleware

Key rule:

> Middleware runs **in the order it is registered**

This affects:

* Authentication
* Logging
* Error handling
* Performance

---

## What is middleware? How is it different from controllers?

### Answer

**Middleware**

* Runs before/after handlers
* Has access to `req`, `res`, `next`
* Used for cross-cutting concerns

**Controllers**

* Contain business logic
* Return responses
* Should be thin

**Senior rule:**

> Middleware = policy
> Controller = logic

---

## How does Express handle concurrency?

### Answer

Express itself is **single-threaded**.

Concurrency is handled by:

* Node.js **event loop**
* Non-blocking async I/O
* OS-level async operations

**Important:**

* One blocking operation blocks **all requests**
* Express relies on **Node’s async model**, not threads

---

## What happens if you run CPU-heavy code in an Express route?

### Answer

CPU-heavy code:

* Blocks the event loop
* Stops all other requests
* Causes timeouts

**Solutions:**

* Move CPU tasks to:

  * Worker threads
  * Child processes
  * Job queues (Bull, RabbitMQ)
* Keep Express routes **I/O-bound**

---

## How do you scale an Express application?

### Answer

Scaling strategy:

1. Stateless Express app
2. Multiple Node processes (PM2 / cluster)
3. Load balancer (Nginx / ALB)
4. Shared cache (Redis)
5. Shared DB

**Never scale by:**
Increasing memory only
Running single Node process

---

## What is the Node.js event loop, and why does it matter for Express?

### Answer

The event loop:

* Executes JS code
* Handles async callbacks
* Processes I/O events

**Phases include:**

* Timers
* I/O callbacks
* Poll
* Check
* Close callbacks

**Why it matters:**
Blocking the event loop kills Express performance.

---

## How do you structure a production-grade Express app?

### Answer

Recommended structure:

```
src/
 ├── app.js
 ├── server.js
 ├── routes/
 ├── controllers/
 ├── services/
 ├── models/
 ├── middlewares/
 ├── utils/
 └── config/
```

**Senior principle:**

* Routes → Controllers → Services → DB
* Thin controllers, fat services

---

## How do you implement authentication in Express?

### Answer

Common approach:

* JWT-based auth
* Auth middleware
* Role-based authorization

Flow:

1. Login → issue JWT
2. Middleware verifies JWT
3. Attach user to `req.user`
4. Authorization middleware checks permissions

**Never:**
Store plain passwords
Skip token expiry

---

## How do you handle errors globally in Express?

### Answer

Use centralized error middleware:

```js
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});
```

Rules:

* Always call `next(err)`
* Never crash the process
* Log errors separately

---

## How do you secure an Express app?

### Answer

Security checklist:

* helmet
* cors (restricted origins)
* Rate limiting
* Input validation
* HTTPS
* Secure cookies
* Environment secrets
* SQL injection protection

**Senior mindset:**
Security is **layered**, not one library.

---

## How do you prevent memory leaks in Express?

### Answer

Common causes:

* Unreleased DB connections
* Global variables
* Event listeners not removed
* Caching without eviction

Prevention:

* Connection pooling
* Proper cleanup
* Heap monitoring
* Process restarts (PM2)

---

## How do you implement rate limiting?

### Answer

Production-ready approach:

* Redis-backed limiter
* Per-IP / per-user limits
* Middleware-based

Never:
In-memory counters (break with scaling)

---

## How does Express compare to Fastify / NestJS?

### Answer

| Express           | Fastify             | NestJS           |
| ----------------- | ------------------- | ---------------- |
| Minimal           | Fast                | Opinionated      |
| Manual validation | Schema-based        | Decorators       |
| Flexible          | Performance-focused | Enterprise-ready |

**Senior decision:**
Choose framework based on **team + scale**, not hype.

---

## How do you handle file uploads in Express?

### Answer

* Use multer
* Stream files (don’t load in memory)
* Store in object storage (S3)
* Process asynchronously

**Never:**
Store large files in memory

---

## How do you test Express applications?

### Answer

Testing stack:

* Jest / Mocha
* Supertest
* Test DB

Test types:

* Unit tests (services)
* Integration tests (routes)
* E2E tests (critical flows)

---

## How do you deploy Express in production?

### Answer

Production setup:

* Node + Express
* PM2 or Docker
* Nginx reverse proxy
* Environment-based config
* Health checks

Never:
nodemon in prod
Single process

---

## How do you handle graceful shutdown?

### Answer

Graceful shutdown:

* Listen for SIGTERM
* Stop accepting new requests
* Close DB connections
* Exit process cleanly

Critical for Kubernetes & Docker.

---

## When should you NOT use Express?

### Answer

* Need strict architecture → NestJS
* Ultra-high throughput → Fastify
* Strong typing required → FastAPI / NestJS
* Serverless-only workloads

Good engineers know **when not to use Express**.

---

## What makes someone “senior” in Express?

### Answer

A senior engineer:

* Understands Node internals
* Avoids event loop blocking
* Designs scalable systems
* Writes testable code
* Secures APIs
* Handles failures gracefully
* Makes trade-offs consciously

---

## EXPRESS SYSTEM-DESIGN BONUS QUESTIONS

### How would you design a high-traffic Express API?

**Answer:**
Stateless app + Redis cache + DB pooling + load balancer + rate limiting.

### How do you handle background jobs?

**Answer:**
Bull / RabbitMQ + worker processes (not Express).

---

## FINAL INTERVIEW CHECKLIST

You’re senior-ready if you can:

* Explain event loop clearly
* Scale horizontally
* Secure APIs
* Handle failures
* Design clean architecture
* Justify framework choices
