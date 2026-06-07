# Phase 1: Execution Context (Foundation)

Everything in JavaScript starts here.

### Topics

* JavaScript Engine
* Execution Context
* Global Execution Context
* Function Execution Context
* Creation Phase
* Execution Phase
* Call Stack

### Questions

1. What is Execution Context?
2. Why does JavaScript need Execution Context?
3. What happens during Creation Phase?
4. What happens during Execution Phase?
5. What is stored in Execution Context?
6. What is Variable Environment?
7. What is Lexical Environment?
8. What is the Call Stack?
9. How does the Call Stack work?
10. What happens when functions call other functions?

### Senior Follow-Ups

* Is Execution Context created for blocks?
* Is Execution Context created for loops?
* How many Execution Contexts can exist simultaneously?
* How does recursion affect the Call Stack?
* What causes Stack Overflow?

---

# Phase 2: Scope & Lexical Environment

Everything else depends on this.

### Topics

* Global Scope
* Function Scope
* Block Scope
* Lexical Scope
* Scope Chain

### Questions

1. What is Scope?
2. What is Lexical Scope?
3. What is Scope Chain?
4. How does identifier lookup work?
5. What happens when a variable isn't found?

### Senior Follow-Ups

* How does V8 resolve identifiers?
* What is an Environment Record?
* What is the difference between Scope Chain and Prototype Chain?
* Why is JavaScript called Lexically Scoped?

---

# Phase 3: Hoisting

### Topics

* var hoisting
* let hoisting
* const hoisting
* function hoisting
* class hoisting

### Questions

1. What is Hoisting?
2. Is hoisting actual movement of code?
3. Which declarations are hoisted?
4. Are functions hoisted?
5. Are classes hoisted?

### Senior Follow-Ups

* How does hoisting happen internally?
* Is hoisting compile-time or runtime?
* Why does var become undefined?
* Why doesn't let become undefined?

---

# Phase 4: TDZ

### Topics

* Temporal Dead Zone
* Initialization
* Lexical Binding
* TDZ in blocks
* TDZ in functions
* TDZ in modules

### Questions

1. What is TDZ?
2. Why was TDZ introduced?
3. How does TDZ improve safety?
4. Why is TDZ a runtime concept?

### Senior Follow-Ups

* How is TDZ implemented internally?
* Can TDZ occur with imports?
* Can TDZ occur in classes?
* Can TDZ occur in parameter initialization?

---

# Phase 5: Closures

One of the most important topics.

### Topics

* Closure
* Lexical Environment Capture
* Memory Retention

### Questions

1. What is Closure?
2. Why are closures useful?
3. What exactly gets captured?

### Senior Follow-Ups

* Do closures capture values or references?
* How are closures stored internally?
* Can closures create memory leaks?
* How does V8 optimize closures?

---

# Phase 6: Objects & Prototypes

Most developers know syntax but not internals.

### Topics

* Objects
* Prototype
* Prototype Chain
* **proto**
* Constructor Functions

### Questions

1. What is Prototype?
2. How does Prototype Chain work?
3. How does property lookup work?

### Senior Follow-Ups

* Difference between prototype and **proto**?
* How does inheritance work internally?
* How does Object.create work?

---

# Phase 7: this Keyword

### Topics

* Global this
* Function this
* Object this
* Arrow Function this

### Questions

1. What is this?
2. How is this determined?
3. What are binding rules?

### Senior Follow-Ups

* Why do arrow functions not have their own this?
* What are implicit and explicit binding?
* How does bind() work internally?

---

# Phase 8: Functions

### Topics

* First Class Functions
* Higher Order Functions
* Callback Functions
* Function Expressions

### Questions

1. Why are functions first-class citizens?
2. What is a higher-order function?

### Senior Follow-Ups

* How does currying work?
* How does partial application work?
* How does memoization work?

---

# Phase 9: Event Loop (Most Important for Node.js)

### Topics

* Call Stack
* Web APIs
* Callback Queue
* Microtask Queue
* Event Loop

### Questions

1. What is Event Loop?
2. Why is JavaScript single-threaded?
3. What is Callback Queue?

### Senior Follow-Ups

* Why do Promises run before setTimeout?
* What is Microtask Queue?
* What is starvation?
* How does Node.js Event Loop differ from Browser?

---

# Phase 10: Node.js Event Loop (Must Master)

### Topics

1. Timers
2. Pending Callbacks
3. Idle/Prepare
4. Poll
5. Check
6. Close Callbacks

### Questions

1. Explain Node Event Loop phases.
2. Difference between setTimeout and setImmediate?
3. process.nextTick vs Promise?

### Senior Follow-Ups

* Which queue executes first?
* Can nextTick starve the Event Loop?
* How does libuv work?

---

# Phase 11: Async JavaScript

### Topics

* Callback
* Promise
* Async Await

### Questions

1. What problem do Promises solve?
2. How does async/await work?

### Senior Follow-Ups

* Is async/await syntactic sugar?
* What happens internally when await is encountered?
* How does Promise chaining work?

---

# Phase 12: Memory Management

### Topics

* Stack Memory
* Heap Memory
* Garbage Collection

### Questions

1. What is Stack Memory?
2. What is Heap Memory?
3. How does Garbage Collection work?

### Senior Follow-Ups

* Mark and Sweep?
* Generational GC?
* Memory Leaks?

---

# Phase 13: ES Modules

### Topics

* import
* export
* live bindings
* module scope

### Questions

1. How do ES Modules work?
2. What are live bindings?

### Senior Follow-Ups

* Circular imports?
* TDZ across modules?
* Difference between ESM and CommonJS?

---

# Phase 14: Advanced JavaScript Internals

### Topics

* Environment Records
* Reference Type
* Property Descriptor
* Event Loop Internals
* Hidden Classes
* Inline Caching

### Senior Questions

1. How does V8 optimize objects?
2. What are hidden classes?
3. What causes de-optimization?
4. How does JIT compilation work?
5. What is Ignition?
6. What is TurboFan?
7. How does V8 optimize function calls?

---

# Ultimate Interview Sequence

Master these topics in this exact order:

```text
JavaScript Engine
↓
Execution Context
↓
Call Stack
↓
Lexical Environment
↓
Scope Chain
↓
Hoisting
↓
TDZ
↓
Closures
↓
this
↓
Objects
↓
Prototype Chain
↓
Functions
↓
Async JavaScript
↓
Event Loop
↓
Promises
↓
Async/Await
↓
Node.js Event Loop
↓
Memory Management
↓
ES Modules
↓
V8 Internals
```

If you can explain each topic with:

* Definition
* Internal Working
* Execution Flow
* Memory Representation
* Common Pitfalls
* Real-world Use Cases
* Senior-Level Follow-Ups

then you'll be operating at the level expected of a Senior Node.js Developer, Technical Lead, or JavaScript Architect rather than someone who has only memorized interview answers.
