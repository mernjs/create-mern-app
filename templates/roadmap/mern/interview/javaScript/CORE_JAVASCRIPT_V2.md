# Phase 15: Data Types & Type System

## Topics

* Primitive Types
* Reference Types
* Dynamic Typing
* Type Coercion
* Boxing & Unboxing

## Questions

1. What are JavaScript data types?
2. Difference between primitive and non-primitive values?
3. Why is JavaScript dynamically typed?
4. What is type coercion?
5. What is implicit coercion?
6. What is explicit coercion?
7. Difference between `==` and `===`?
8. What is boxing and unboxing?

## Senior Follow-Ups

* Why does:

```javascript
[] == false
```

return true?

* Why does:

```javascript
{} + []
```

behave differently from:

```javascript
[] + {}
```

* How does the Abstract Equality Algorithm work?
* What is ToPrimitive conversion?
* Explain Symbol and BigInt internals.

---

# Phase 16: Equality & Comparison Internals

## Topics

* == Operator
* === Operator
* SameValue
* SameValueZero
* Object.is()

## Questions

1. Difference between `==` and `===`?
2. When should Object.is() be used?
3. Why is:

```javascript
NaN === NaN
```

false?

## Senior Follow-Ups

* Explain ECMAScript Equality Algorithms.

* Difference between:

  * Strict Equality
  * Abstract Equality
  * SameValue
  * SameValueZero

* Why does Set use SameValueZero?

---

# Phase 17: Objects Deep Dive

## Topics

* Object Creation
* Object.freeze
* Object.seal
* Object.preventExtensions

## Questions

1. How are objects stored in memory?
2. Difference between freeze and seal?
3. What is object mutability?

## Senior Follow-Ups

* Shallow Freeze vs Deep Freeze?
* How does property lookup work?
* Hidden Classes in V8?
* Shape transitions?

---

# Phase 18: Property Descriptors

## Topics

* Writable
* Enumerable
* Configurable
* Getter
* Setter

## Questions

1. What are property descriptors?
2. How do getters and setters work?

## Senior Follow-Ups

* Difference between data property and accessor property?
* How does Object.defineProperty work internally?

---

# Phase 19: Destructuring

## Topics

* Array Destructuring
* Object Destructuring
* Nested Destructuring
* Defaults

## Questions

1. How does destructuring work?
2. What happens if a property doesn't exist?

## Senior Follow-Ups

* Is destructuring shallow or deep?
* Performance implications?
* Evaluation order?

---

# Phase 20: Spread & Rest Operators

## Topics

* Spread
* Rest
* Cloning
* Merging

## Questions

1. Difference between spread and rest?
2. Is spread a deep copy?

## Senior Follow-Ups

* How is spread implemented internally?
* Why can spread create performance issues?

---

# Phase 21: Arrays Deep Dive

## Topics

* Sparse Arrays
* Dense Arrays
* Array Methods

## Questions

1. Difference between map and forEach?
2. Difference between filter and find?
3. Difference between slice and splice?

## Senior Follow-Ups

* How are arrays optimized in V8?
* What are holey arrays?
* Why do sparse arrays hurt performance?

---

# Phase 22: Iterators & Generators

## Topics

* Iterator Protocol
* Iterable Protocol
* Generators

## Questions

1. What is an iterator?
2. What is an iterable?
3. How do generators work?

## Senior Follow-Ups

* How does `yield` pause execution?
* Generator Execution Context?
* Async Generators?

---

# Phase 23: Symbol & BigInt

## Topics

* Symbol
* BigInt

## Questions

1. Why was Symbol introduced?
2. Why was BigInt introduced?

## Senior Follow-Ups

* How do Symbols prevent property collisions?
* What are well-known Symbols?

---

# Phase 24: Error Handling

## Topics

* try/catch
* throw
* finally
* Error Types

## Questions

1. How does try/catch work?
2. What is the purpose of finally?

## Senior Follow-Ups

* Async error handling?
* Unhandled Promise Rejections?
* Error propagation?

---

# Phase 25: Classes & OOP

## Topics

* Classes
* Constructors
* Inheritance

## Questions

1. Are classes real classes?
2. How is inheritance implemented?

## Senior Follow-Ups

* Class vs Prototype?
* Private Fields?
* Static Fields?
* Class TDZ?

---

# Phase 26: Functional Programming

## Topics

* Pure Functions
* Immutability
* Composition

## Questions

1. What is a pure function?
2. What is immutability?

## Senior Follow-Ups

* Referential Transparency?
* Function Composition?
* Currying vs Partial Application?

---

# Phase 27: Proxies & Reflect

## Topics

* Proxy
* Reflect

## Questions

1. What is a Proxy?
2. Why use Reflect?

## Senior Follow-Ups

* How does Proxy intercept operations?
* Performance considerations?
* Framework usage (Vue, MobX)?

---

# Phase 28: Event Propagation (Browser)

## Topics

* Capturing
* Bubbling
* Delegation

## Questions

1. What is event bubbling?
2. What is event capturing?

## Senior Follow-Ups

* Event delegation optimization?
* stopPropagation vs stopImmediatePropagation?

---

# Phase 29: Web APIs & Browser Internals

## Topics

* DOM
* BOM
* Web APIs

## Questions

1. What are Web APIs?
2. Who provides setTimeout?

## Senior Follow-Ups

* Browser architecture?
* Rendering pipeline?
* Reflow vs Repaint?

---

# Phase 30: JavaScript Engine Internals

## Topics

* Parser
* AST
* Interpreter
* JIT

## Questions

1. What happens when JS code executes?
2. What is AST?

## Senior Follow-Ups

* Ignition?
* TurboFan?
* Hidden Classes?
* Inline Caching?
* Deoptimization?

---

# Phase 31: Memory Optimization & Performance

## Topics

* Memory Leaks
* GC
* Optimization

## Questions

1. What causes memory leaks?
2. How can closures leak memory?

## Senior Follow-Ups

* Detached DOM references?
* WeakMap?
* WeakSet?
* Memory profiling?

---

# Phase 32: Security Fundamentals

## Topics

* XSS
* CSRF
* Prototype Pollution

## Questions

1. What is XSS?
2. What is CSRF?

## Senior Follow-Ups

* How does prototype pollution happen?
* How to prevent it?
* Secure object creation?

---

# Phase 33: Advanced Async Patterns

## Topics

* Promise.all
* Promise.race
* Promise.any
* Promise.allSettled

## Questions

1. Difference between Promise combinators?
2. When to use Promise.allSettled?

## Senior Follow-Ups

* Failure handling?
* Concurrency control?
* Backpressure?

---

# Phase 34: Module Systems

## Topics

* CommonJS
* ES Modules

## Questions

1. Difference between require and import?
2. What are live bindings?

## Senior Follow-Ups

* Module caching?
* Circular dependencies?
* Dynamic imports?

---

# Phase 35: Frequently Missed Senior Topics

## Questions

1. What is the difference between:

```javascript
null
```

and

```javascript
undefined
```

2. Why is:

```javascript
typeof null
```

equal to `"object"`?

3. What is:

```javascript
void 0
```

?

4. What is:

```javascript
globalThis
```

?

5. Difference between:

```javascript
call()
apply()
bind()
```

6. What is currying?

7. What is memoization?

8. What is debouncing?

9. What is throttling?

10. How does WeakMap differ from Map?

---

# Topics Commonly Asked in 5+ Years Node.js Interviews

If you're targeting Senior Node.js roles, these topics are almost mandatory:

```text
Execution Context
Lexical Environment
Scope Chain
Hoisting
TDZ
Closures
this
Prototype Chain
Object Internals
Type Coercion
Equality Algorithms
Promises
Event Loop
Node Event Loop
process.nextTick
setImmediate
Memory Management
Garbage Collection
ES Modules
CommonJS
WeakMap / WeakSet
Proxy
Reflect
JavaScript Engine Internals (V8)
Performance Optimization
```

Mastering all 35 phases above covers virtually every JavaScript fundamental and senior-level follow-up question likely to appear in Node.js, React, Full-Stack, Technical Lead, and Architect interviews.
