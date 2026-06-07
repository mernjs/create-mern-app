### Basic Questions

1. What is the Temporal Dead Zone in JavaScript?
2. Why does TDZ exist?
3. Which declarations are affected by TDZ?
4. Does `var` have a TDZ? Why or why not?
5. What error is thrown when accessing a variable in its TDZ?

### Hoisting & TDZ

6. Are `let` and `const` hoisted?
7. If `let` and `const` are hoisted, why can't they be accessed before declaration?
8. How is hoisting of `var` different from hoisting of `let` and `const`?

```javascript
console.log(a);
let a = 10;
```

9. What happens when this code runs, and why?

---

### Block Scope Questions

```javascript
let x = 1;

{
  console.log(x);
  let x = 2;
}
```

10. What will happen here and why?

11. When does the TDZ start and end within a block?

---

### `typeof` and TDZ

```javascript
console.log(typeof a);
let a = 5;
```

12. What happens here?

13. Why does `typeof undeclaredVariable` return `"undefined"` but `typeof` on a TDZ variable throws an error?

---

### Function & Closure Questions

```javascript
let a = 10;

function test() {
  console.log(a);
  let a = 20;
}

test();
```

14. What is the output and why?

15. How does lexical scoping interact with TDZ?

---

### `const` and TDZ

16. Does `const` have a TDZ?
17. Why must a `const` variable be initialized during declaration?

```javascript
const x;
```

18. What error occurs here?

---

### Advanced Questions

```javascript
let a = a;
```

19. What happens when this code executes?

```javascript
function foo(a = b, b = 2) {
  return a + b;
}

foo();
```

20. Will this work? Explain.

```javascript
{
  let x = 1;
  {
    console.log(x);
    let x = 2;
  }
}
```

21. Why does the inner `x` cause an error despite an outer `x` existing?

---

### Tricky Interview Question

```javascript
let x = 10;

function demo() {
  console.log(x);
  if (true) {
    let x = 20;
  }
}

demo();
```

22. What is the output and why?

---

### Senior-Level Discussion Questions

23. How is TDZ implemented internally by JavaScript engines?
24. What is the difference between a variable being "hoisted" and being "initialized"?
25. How does TDZ improve language safety compared to ES5?
26. Can TDZ occur in class declarations?
27. How does TDZ behave with ES modules and circular imports?

A very common senior-level interview question is:

> **"If `let` and `const` are hoisted, prove it."**

Expected answer: They are hoisted to the top of their scope, but remain uninitialized until execution reaches the declaration, creating the TDZ. If they were not hoisted, JavaScript wouldn't know they exist before the declaration and would throw a different error (`not defined`) instead of a TDZ-related `ReferenceError`.


