* Execution Context
* Memory Creation Phase
* Lexical Environment
* Environment Record
* Scope Chain
* Identifier Resolution
* Hoisting
* Initialization
* Runtime vs Compile Time
* Engine Internals (V8)

Let's take a few questions and answer them at a senior level.

---

# 28. What happens during the Memory Creation Phase for `let` and `const`?

## Short Answer

`let` and `const` are hoisted and memory is allocated for them, but they remain uninitialized until the execution reaches their declaration.

---

## Detailed Answer

JavaScript executes code in two phases:

### 1. Memory Creation Phase

During this phase the JavaScript engine scans the entire scope and creates memory bindings for all variables and functions.

Consider:

```javascript
let a = 10;
const b = 20;
```

During Memory Creation:

```text
Lexical Environment

a → <uninitialized>
b → <uninitialized>
```

Notice:

```text
NOT

a → undefined
b → undefined
```

This is the major difference from `var`.

At this stage the variables exist in memory but cannot be accessed.

---

### 2. Execution Phase

When execution reaches:

```javascript
let a = 10;
```

the engine changes:

```text
a → <uninitialized>
```

to

```text
a → 10
```

Now access becomes legal.

---

### Why TDZ Exists

Without TDZ:

```javascript
console.log(a);

let a = 10;
```

would print:

```javascript
undefined
```

which could hide programming mistakes.

ES6 intentionally prevents this.

---

# 32. How does JavaScript decide whether a variable is in TDZ?

This is a very common senior-level interview question.

---

## Example

```javascript
{
    console.log(x);

    let x = 10;
}
```

---

## Internal Engine Process

When the engine sees:

```javascript
console.log(x);
```

it performs Identifier Resolution.

### Step 1

Search current Lexical Environment.

```text
Block Scope

x → <uninitialized>
```

Binding found.

---

### Step 2

Check initialization state.

```text
Initialized?

NO
```

---

### Step 3

Throw error.

```javascript
ReferenceError:
Cannot access 'x' before initialization
```

---

### Important

The engine DOES NOT continue searching parent scopes.

Because it already found the variable.

This explains shadowing-related TDZ errors.

---

# 34. Why does this throw?

```javascript
let x = 1;

{
    console.log(x);

    let x = 2;
}
```

Many developers answer incorrectly.

---

## What Most Developers Think

```text
Outer x exists

Output = 1
```

Wrong.

---

## What Actually Happens

When block execution starts:

```text
Global Scope

x → 1
```

New block scope created:

```text
Block Scope

x → <uninitialized>
```

Now scope chain looks like:

```text
Block Scope
   ↓
Global Scope
```

---

When:

```javascript
console.log(x);
```

executes:

Engine searches:

### Current Scope

```text
x found
```

Result:

```text
x → <uninitialized>
```

Because binding exists, lookup stops.

The global variable is never checked.

---

Therefore:

```javascript
ReferenceError
```

---

## Interview Follow-Up

Why doesn't JavaScript continue searching parent scopes?

Answer:

Because identifier resolution stops at the first matching binding.

The initialization state is checked only after the binding is found.

---

# 41. Why does this work?

```javascript
{
    const fn = () => x;

    let x = 10;

    console.log(fn());
}
```

---

## Common Wrong Answer

"Because closures remember values."

Wrong.

Closures do NOT remember values.

Closures remember bindings.

---

## What Actually Happens

When function is created:

```javascript
const fn = () => x;
```

the engine stores a reference to the lexical environment.

Conceptually:

```text
fn
 ↓
Lexical Environment
 ↓
x
```

At this moment:

```text
x → <uninitialized>
```

No lookup occurs.

No error occurs.

---

## Later

Execution reaches:

```javascript
let x = 10;
```

Now:

```text
x → 10
```

---

## Later

```javascript
fn()
```

runs.

Only now does identifier resolution occur.

Engine searches:

```text
x → 10
```

Result:

```javascript
10
```

---

## Senior-Level Statement

Closures capture environment references, not variable values.

Variable lookup occurs when the function executes, not when it is created.

---

# 43. Are Class Declarations Hoisted?

## Short Answer

Yes.

Class declarations are hoisted exactly like `let`.

They are placed in the lexical environment during creation phase but remain uninitialized.

---

## Example

```javascript
new User();

class User {}
```

Output:

```javascript
ReferenceError:
Cannot access 'User' before initialization
```

---

## Why?

Memory Creation Phase:

```text
User → <uninitialized>
```

Execution reaches:

```javascript
new User();
```

Engine finds binding.

Binding exists.

But:

```text
User → <uninitialized>
```

Therefore TDZ error.

---

## Interview Follow-Up

If classes are hoisted, why doesn't this work?

Answer:

Because hoisting and initialization are different concepts.

The class binding exists before execution but is not initialized.

---

# 48. What happens with Circular Imports?

This is a favorite question in modern Node.js interviews.

---

## moduleA.js

```javascript
import { b } from "./moduleB.js";

console.log(b);

export const a = 1;
```

---

## moduleB.js

```javascript
import { a } from "./moduleA.js";

console.log(a);

export const b = 2;
```

---

## What Happens

### Step 1

Node starts evaluating:

```text
moduleA
```

---

### Step 2

moduleA imports:

```text
moduleB
```

---

### Step 3

moduleB imports:

```text
moduleA
```

---

Now:

```text
a exists
```

but:

```text
a → <uninitialized>
```

because moduleA has not completed execution.

---

When:

```javascript
console.log(a);
```

runs inside moduleB:

Engine resolves:

```text
a → <uninitialized>
```

---

Result:

```javascript
ReferenceError
```

---

## Why ESM Behaves This Way

ES Modules use:

```text
Live Bindings
```

not copies.

Imports point directly to exported variables.

If export isn't initialized:

```text
TDZ applies
```

---

## Why CommonJS Was Different

CommonJS:

```javascript
require()
```

returns partially built objects.

Example:

```javascript
module.exports = {}
```

During circular dependencies:

```javascript
undefined
```

is often returned instead of throwing.

---

# 66. Explain TDZ using Execution Context, Lexical Environment, Environment Record, Scope Chain, and Identifier Resolution

This is a FAANG-level answer.

---

Consider:

```javascript
console.log(a);

let a = 10;
```

---

## Step 1: Execution Context Creation

Global Execution Context is created.

Two internal structures are created:

```text
Variable Environment
Lexical Environment
```

---

## Step 2: Environment Record Creation

Engine scans declarations.

Finds:

```javascript
let a
```

Creates binding:

```text
Lexical Environment

a → <uninitialized>
```

---

## Step 3: Execution Begins

Engine executes:

```javascript
console.log(a);
```

---

## Step 4: Identifier Resolution

Engine searches scope chain.

Current scope:

```text
a found
```

---

## Step 5: Initialization Check

Engine checks:

```text
Is a initialized?
```

Answer:

```text
NO
```

---

## Step 6: TDZ Violation

Engine throws:

```javascript
ReferenceError:
Cannot access 'a' before initialization
```

---

## Step 7: Declaration Executes

Later:

```javascript
let a = 10;
```

changes:

```text
a → <uninitialized>
```

to

```text
a → 10
```

---

## Senior-Level Summary

The Temporal Dead Zone is not merely "accessing a variable before declaration."

TDZ is the period between:

```text
Binding Creation
```

and

```text
Binding Initialization
```

During this period:

* The identifier exists.
* The scope chain can find it.
* The environment record contains it.
* The binding is uninitialized.
* Any access triggers a runtime ReferenceError.

This explanation demonstrates understanding of JavaScript execution internals rather than memorizing the definition of TDZ.
