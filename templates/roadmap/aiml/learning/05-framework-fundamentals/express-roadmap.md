# Express.js Roadmap

---

## Phase 0 — Prerequisites & mindset (what you must already know)

Goal: be comfortable with JavaScript & Node.js basics so Express concepts click immediately.

* JavaScript: ES6+ features (let/const, arrow functions, promises, async/await, destructuring, modules).
* Node.js basics: `require` / ES modules, npm/yarn, event loop, Buffer, streams, process env.
* Git and command line fundamentals.
* Basic HTTP concepts: requests, responses, methods, status codes, headers, CORS.

Checkpoint: can write a small Node script using async/await that reads a file and prints JSON.

---

## Phase 1 — Getting started with Express (core concepts)

Goal: scaffold a working Express app and understand request/response lifecycle.

### Learn:

* What Express is: minimal web framework for Node.
* App & Router: `express()` , `app.use()`, `app.get/post()`, `express.Router()`.
* Middleware concept and order of execution.
* Request and response objects (`req`, `res`).
* Error handling middleware.

### Actions & commands

1. Initialize project:

```bash
mkdir my-express-app
cd my-express-app
npm init -y
npm i express
```

2. Minimal server:

```js
// index.js (ESM)
import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('Hello, Vijay!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening ${PORT}`));
```

3. Run:

```bash
node index.js
# or with nodemon during dev
npm i -D nodemon
npx nodemon index.js
```

### Exercises

* Add routes for `/about`, `/health`.
* Add a 404 handler and global error handler.

Checkpoint: Able to run server locally and respond to GET and POST requests.

---

## Phase 2 — Middleware, body parsing, static files

Goal: handle request bodies, serve static assets, and create reusable middleware.

### Learn:

* Built-in middleware: `express.json()`, `express.urlencoded()`, `express.static()`.
* Third-party middleware: `morgan` (logging), `helmet` (security headers), `cors`.
* Custom middleware pattern: `function(req,res,next){}`.
* Mounting routers and modular route design.

### Example snippets

```js
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));
```

### Exercises

* Write a custom middleware that measures request time and logs it.
* Create a `routes/` folder and move routes to separate files using `express.Router()`.

Checkpoint: App structured with routers and middleware pipeline.

---

## Phase 3 — Routing patterns & REST API design

Goal: design clean REST endpoints, use params, query strings, and route validators.

### Learn:

* RESTful routing conventions.
* Route params (`/users/:id`), query strings.
* Nesting routers (e.g., `/api/v1/users`).
* Input validation (recommend libraries later) — for now validate manually.

### Example:

```js
const router = express.Router();
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'Test' });
});
app.use('/api/v1', router);
```

### Exercises

* Build CRUD routes for a simple `notes` resource (in-memory store).
* Implement robust response shapes: `{ success: true, data: ..., error: null }`.

Checkpoint: Well-structured REST API with versioning and modular routers.

---

## Phase 4 — Persistence: Databases & ORMs

Goal: connect your Express app to a database and perform CRUD.

### Options to learn (pick one and get comfortable):

* SQL: PostgreSQL (node-postgres `pg`) or MySQL (mysql2).
* ORM / Query builders: Prisma, TypeORM, Sequelize, Objection.js, Knex.
* NoSQL: MongoDB with Mongoose (or native `mongodb`).

### Suggested actions

* Use environment variables for DB credentials (`dotenv`).
* Create a simple user model and persist users.
* Add migrations (if using SQL) or schema validation (MongoDB).

### Example (pseudo using `pg`):

```js
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const res = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
```

### Exercises

* Build endpoints: create user, get user, update user, delete user.
* Add unique index and proper error handling for constraint violations.

Checkpoint: Data persists; API uses DB instead of in-memory.

---

## Phase 5 — Authentication & Authorization

Goal: implement secure auth flows and role-based access.

### Learn:

* Session-based auth (express-session + cookie store).
* Token-based auth: JSON Web Tokens (JWT).
* Password storage: bcrypt / argon2.
* Social logins & OAuth basics (high-level).
* Protecting routes using middleware (`authorize`, `authenticate`).

### Snippet (JWT-based protect middleware):

```js
import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

### Exercises

* Implement signup (hash password), login (return JWT), protected route (`/me`).
* Add roles (admin/user) and route-level authorization.

Checkpoint: Secure endpoints; users can sign up, log in, access protected routes.

---

## Phase 6 — Input validation, file uploads, and email

Goal: make input robust and support file and email flows.

### Learn:

* Validation libraries: `joi`, `zod`, or `express-validator`.
* File uploads: `multer` for multipart/form-data.
* Sending emails: nodemailer or transactional email services (conceptually).
* Rate limiting: `express-rate-limit`.

### Example with multer:

```js
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('avatar'), (req, res) => {
  res.json({ file: req.file });
});
```

### Exercises

* Add user avatar upload with size/type checks.
* Add server-side validation to all POST endpoints.

Checkpoint: Uploads work securely; input validated centrally.

---

## Phase 7 — Testing & Quality

Goal: reliable tests and better DX.

### Learn:

* Unit tests with Jest or Mocha + Chai.
* Integration tests for endpoints using `supertest`.
* Linting (ESLint), formatting (Prettier), and typing (TypeScript).
* Test coverage and CI integration.

### Example (supertest + jest):

```js
import request from 'supertest';
import app from '../src/app';

test('GET /health', async () => {
  const res = await request(app).get('/health');
  expect(res.statusCode).toBe(200);
  expect(res.body.ok).toBe(true);
});
```

### Exercises

* Write unit tests for middleware functions.
* Add a small integration test suite that runs in CI.

Checkpoint: Passing tests locally and in CI.

---

## Phase 8 — Error handling, logging & observability

Goal: production-grade error reporting and traceability.

### Learn:

* Centralized error handler for structured errors.
* Logging: `winston`, `pino` or similar (structured JSON logs).
* Request tracing correlation IDs.
* Introduce basic metrics (request count, latency).
* Integrate an APM / Sentry (conceptually).

### Example error middleware:

```js
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});
```

### Exercises

* Add `pino` logging and rotate logs or stream to stdout for containerization.
* Add a `/metrics` endpoint if using Prometheus (conceptual).

Checkpoint: Structured logs + consistent error shapes.

---

## Phase 9 — Security hardening checklist

Goal: mitigate common web vulnerabilities.

### Checklist (must-have)

* Use `helmet()` for headers.
* Validate and sanitize inputs.
* Use `express-rate-limit`.
* Use secure cookies & HTTPS only in prod.
* Avoid eval / unsanitized templates.
* Protect against SQL injection (use parameterized queries).
* Use CSP, XSS protection, and CORS minimally.
* Protect secrets: `process.env` & secret manager in prod.

Checkpoint: Security middleware in place + secrets not in repo.

---

## Phase 10 — Performance, caching & scaling

Goal: make your app fast and scalable.

### Learn:

* Node performance basics (event loop blocking pitfalls).
* Use clustering (PM2 or Node cluster) to utilize CPUs.
* Caching layers: in-memory (LRU), Redis for distributed cache & session store.
* Use HTTP caching headers & conditional requests.
* Rate limiting & throttling strategies.
* Static assets via CDN.

### Exercises

* Add Redis caching for a heavy DB query.
* Run app with cluster mode (PM2) locally to observe multiple workers.

Checkpoint: App uses Redis for cache/session and supports multiple workers.

---

## Phase 11 — Deployment & infra basics

Goal: deploy to a real environment with CI/CD.

### Learn:

* Containerize your app: Dockerfile + `.dockerignore`.
* Use process manager: PM2 or run in container orchestrator.
* Deploy options: cloud run / ECS / EKS / Heroku / DigitalOcean / Vercel (APIs)/Netlify (functions) — conceptually choose what fits.
* Environment management and secrets (env vars, secret manager).
* Health checks and readiness probes.

### Sample Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
CMD ["node", "index.js"]
```

### CI/CD

* Run tests, lint, build, and then push to registry and deploy.
* Use GitHub Actions / GitLab CI / CircleCI (conceptually).

Checkpoint: App builds inside Docker and deploys to chosen environment.

---

## Phase 12 — Advanced topics

Goal: deepen your senior dev skillset.

### Topics

* TypeScript + Express for type safety.
* GraphQL (Apollo/GraphQL-server) vs REST.
* Microservices & service-to-service auth.
* Event-driven architecture (RabbitMQ, Kafka).
* Serverless functions for certain endpoints.
* Observability: distributed tracing (OpenTelemetry).
* API gateways, rate-limiting at edge (Cloudflare, API Gateway).
* Zero downtime deployments and canary releases.

### Exercises

* Convert a route to GraphQL.
* Add TypeScript to your Express project (ts-node / build step).

Checkpoint: Familiarity with one advanced area and a PoC implemented.

---

## Concrete project progression (what to build)

1. **Beginner:** Simple Notes API (in-memory).
2. **Intermediate:** Notes API with PostgreSQL + JWT auth + file upload + validation + tests.
3. **Advanced:** Multi-tenant API with Redis caching, background jobs (Bull/bee-queue), CI/CD, Docker, monitoring.

---


## Useful dev tools & libs (names only)

* Logger: `pino` or `winston`
* Validation: `joi`, `zod`, `express-validator`
* DB: `pg`, `mongoose`, `prisma`
* Auth: `jsonwebtoken`, `bcrypt`, `passport` (for OAuth)
* Uploads: `multer`
* Testing: `jest`, `mocha`, `supertest`
* Lint/format: `eslint`, `prettier`
* Security: `helmet`, `express-rate-limit`, `cors`
* Queue: `bull`, `bee-queue`
* Job scheduler: `node-cron`
* Env: `dotenv` (local), secret manager in prod

---

## Common pitfalls & how to avoid them

* Blocking the event loop — avoid heavy CPU work; offload to workers.
* Storing secrets in code — always use env or secret manager.
* Loose validation — always validate input server-side.
* Not handling errors centrally — use structured error middleware.
* Mixing concerns — keep controllers thin; use services for business logic.

---

## Checklist / Minimum viable production checklist

* [ ] Linting & Prettier
* [ ] Unit & integration tests
* [ ] Centralized logging
* [ ] Error handler & monitoring
* [ ] Secure headers & rate limiter
* [ ] DB backups / migrations
* [ ] Dockerized build
* [ ] Health & readiness endpoints
* [ ] Environment config (secrets in vault)
* [ ] CI pipeline for tests + deploy
