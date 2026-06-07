# NODE.JS MASTER ROADMAP (SENIOR LEVEL)

## Phase 1: Node.js Fundamentals & Architecture

### Topics

* What is Node.js?
* Why was Node.js created?
* Node.js Architecture
* V8 Engine
* libuv
* Event Loop
* Thread Pool
* Non-blocking I/O
* Event Driven Architecture

---

### Interview Questions

#### 1. What is Node.js?

##### Follow-Up Questions

* Is Node.js a framework?
* Is Node.js a language?
* Is Node.js single-threaded?
* Is Node.js multi-threaded?
* Why was Node.js created?
* What problem does Node.js solve?
* Why is Node.js good for I/O-heavy applications?
* Why is Node.js not ideal for CPU-intensive workloads?

---

#### 2. Explain Node.js Architecture.

##### Follow-Up Questions

* What components exist inside Node.js?
* What role does V8 play?
* What role does libuv play?
* What role does the Event Loop play?
* What role does the Thread Pool play?
* What happens when an HTTP request arrives?

---

#### 3. How does Node.js handle 10,000 concurrent requests?

##### Follow-Up Questions

* How many threads are created?
* What happens in memory?
* What happens when requests are waiting for DB?
* Why doesn't Node.js create one thread per request?

---

# Phase 2: V8 Engine Internals

### Topics

* Parser
* AST
* Ignition
* TurboFan
* JIT Compilation
* Hidden Classes
* Inline Caching

---

### Interview Questions

#### 1. What happens when Node.js executes JavaScript?

##### Follow-Up Questions

* What is parsing?
* What is AST?
* What is bytecode?
* What is Ignition?
* What is TurboFan?
* What is optimization?
* What is de-optimization?

---

#### 2. What are Hidden Classes?

##### Follow-Up Questions

* Why does V8 use hidden classes?
* How do hidden classes improve performance?
* What causes hidden class transitions?
* What coding patterns hurt optimization?

---

#### 3. What is Inline Caching?

##### Follow-Up Questions

* Monomorphic cache?
* Polymorphic cache?
* Megamorphic cache?
* Why does it matter?

---

# Phase 3: Event Loop Deep Dive

### Topics

* Call Stack
* Event Loop
* Event Loop Phases
* Callback Queue
* Microtask Queue

---

### Interview Questions

#### 1. Explain Node.js Event Loop.

##### Follow-Up Questions

* Why does Node.js need Event Loop?
* How does Event Loop work?
* When does Event Loop stop?

---

#### 2. Explain all Event Loop Phases.

##### Follow-Up Questions

```text
Timers
Pending Callbacks
Idle
Prepare
Poll
Check
Close Callbacks
```

* What happens inside each phase?
* Which phase is most important?
* What happens if Poll Queue is empty?
* Can Poll block execution?

---

#### 3. Explain execution order.

```javascript
setTimeout(()=>{},0);

setImmediate(()=>{});

Promise.resolve().then(()=>{});

process.nextTick(()=>{});
```

##### Follow-Ups

* Why does nextTick run first?
* Why do Promises run before Timers?
* Can nextTick starve Event Loop?

---

# Phase 4: libuv Internals

### Topics

* libuv Architecture
* Thread Pool
* Event Demultiplexing
* OS Interaction

---

### Interview Questions

#### 1. What is libuv?

##### Follow-Ups

* Why was libuv created?
* What problem does it solve?
* Does libuv execute JavaScript?

---

#### 2. What uses the Thread Pool?

##### Follow-Ups

```text
File System
DNS
Crypto
Compression
PBKDF2
bcrypt
```

* Why are these not handled by Event Loop?
* What happens when Thread Pool is exhausted?

---

#### 3. What is UV_THREADPOOL_SIZE?

##### Follow-Ups

* Default value?
* Maximum value?
* When should you increase it?
* When should you not increase it?

---

# Phase 5: process.nextTick vs Promise vs Timers

### Topics

* Microtasks
* Macrotasks
* Scheduling

---

### Interview Questions

#### 1. Difference between:

```javascript
process.nextTick()
Promise.then()
setTimeout()
setImmediate()
```

##### Follow-Ups

* Internal queue order?
* Starvation problems?
* Real-world usage?

---

#### 2. Why is process.nextTick dangerous?

##### Follow-Ups

* Infinite recursion?
* Event Loop starvation?
* Production impact?

---

# Phase 6: Streams (Most Asked Senior Topic)

### Topics

```text
Readable
Writable
Duplex
Transform
Pipeline
Backpressure
```

---

### Interview Questions

#### 1. What are Streams?

##### Follow-Ups

* Why use Streams?
* Why not use readFile?
* What happens with a 10GB file?

---

#### 2. Explain Backpressure.

##### Follow-Ups

* How does Node detect backpressure?
* What is highWaterMark?
* What happens if backpressure is ignored?

---

#### 3. Stream Lifecycle

##### Follow-Ups

```text
open
data
readable
end
finish
close
error
```

---

# Phase 7: Buffers

### Topics

* Binary Data
* Buffer Pool
* Encoding

---

### Interview Questions

#### 1. What is Buffer?

##### Follow-Ups

* Why was Buffer introduced?
* How does Buffer differ from String?
* Why are Buffers important for networking?

---

#### 2. Buffer Internals

##### Follow-Ups

* Memory allocation?
* Buffer pool?
* Memory fragmentation?

---

# Phase 8: File System Internals

### Topics

* Async FS
* Sync FS
* Streams
* Thread Pool

---

### Interview Questions

#### 1. Difference between:

```javascript
readFile
readFileSync
createReadStream
```

##### Follow-Ups

* Which uses Thread Pool?
* Which blocks Event Loop?
* Which is best for large files?

---

#### 2. How does fs.readFile work internally?

##### Follow-Ups

* Event Loop involvement?
* Thread Pool involvement?
* Callback scheduling?

---

# Phase 9: Child Process

### Topics

```text
exec
spawn
fork
execFile
```

---

### Interview Questions

#### 1. Difference between exec and spawn.

##### Follow-Ups

* Memory usage?
* Large output handling?
* Shell invocation?

---

#### 2. What is fork()?

##### Follow-Ups

* IPC?
* Message passing?
* Use cases?

---

# Phase 10: Worker Threads

### Topics

* SharedArrayBuffer
* Atomics
* CPU Intensive Tasks

---

### Interview Questions

#### 1. Why Worker Threads?

##### Follow-Ups

* Why not Child Process?
* Shared memory?
* CPU-bound work?

---

#### 2. Worker Threads vs Cluster vs Child Process

##### Follow-Ups

* Memory model?
* Communication model?
* Performance trade-offs?

---

# Phase 11: Memory Management & GC

### Topics

```text
Stack
Heap
Young Generation
Old Generation
GC
```

---

### Interview Questions

#### 1. How does V8 Garbage Collection work?

##### Follow-Ups

* Mark-and-Sweep?
* Scavenge?
* Incremental Marking?
* Memory Promotion?

---

#### 2. What causes memory leaks?

##### Follow-Ups

```javascript
Global Variables
Closures
Timers
Event Listeners
Caches
Maps
```

* How to identify leaks?
* Heap Snapshots?
* Memory Profiling?

---

# Phase 12: Module System

### Topics

```text
CommonJS
ESM
Module Cache
Resolution Algorithm
```

---

### Interview Questions

#### 1. How does require() work internally?

##### Follow-Ups

* Resolution algorithm?
* Cache?
* Wrapper function?

---

#### 2. CommonJS vs ES Modules

##### Follow-Ups

* Live bindings?
* Tree shaking?
* Circular dependencies?

---

# Phase 13: HTTP Internals

### Topics

* TCP Socket
* HTTP Parser
* Request Lifecycle

---

### Interview Questions

#### 1. What happens when a browser hits your Node.js API?

##### Follow-Ups

```text
DNS Lookup
TCP Handshake
TLS Handshake
HTTP Parsing
Event Loop
Route Handling
Response Writing
```

---

#### 2. What is Keep-Alive?

##### Follow-Ups

* Why faster?
* Connection reuse?
* Resource management?

---

# Phase 14: Scaling Node.js Applications

### Topics

```text
Cluster
PM2
Load Balancer
Horizontal Scaling
```

---

### Interview Questions

#### 1. How would you scale Node.js to 1 million users?

##### Follow-Ups

* Load balancing?
* Redis?
* Caching?
* Queueing?

---

#### 2. Cluster Internals

##### Follow-Ups

* Sticky Sessions?
* Worker crashes?
* Process management?

---

# Phase 15: Production Engineering

### Topics

```text
Logging
Monitoring
Tracing
Health Checks
Graceful Shutdown
```

---

### Interview Questions

#### 1. How do you debug a production memory leak?

##### Follow-Ups

* Heap Dumps?
* Clinic.js?
* Chrome DevTools?

---

#### 2. Graceful Shutdown

##### Follow-Ups

* SIGTERM?
* SIGINT?
* Connection draining?
* Kubernetes lifecycle?

---

# Phase 16: Senior/Architect Topics

### Topics

```text
Async Hooks
Diagnostics Channel
OpenTelemetry
Node Inspector
Native Addons
N-API
libuv Internals
V8 Heap Internals
```

### Interview Questions

#### 1. What are Async Hooks?

##### Follow-Ups

* Context propagation?
* Request tracing?

---

#### 2. How would you trace a request across microservices?

##### Follow-Ups

* Correlation IDs?
* Distributed Tracing?
* OpenTelemetry?

---

## Highest-Priority Topics for 5+ Years Node.js Interviews

```text
Node Architecture
V8 Engine
Event Loop
libuv
process.nextTick
Promises
Streams
Backpressure
Buffers
File System Internals
Worker Threads
Child Processes
Cluster
Memory Management
Garbage Collection
Module System
ESM vs CommonJS
HTTP Internals
Scaling
Performance Optimization
Production Debugging
```

These topics with their follow-up chains are what typically separate a mid-level Node.js developer from a senior engineer or architect in interviews.
