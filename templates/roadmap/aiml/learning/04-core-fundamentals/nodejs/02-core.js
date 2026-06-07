"use strict";

/* =====================================================
   PROGRAM START
===================================================== */
console.log("===== JAVASCRIPT CORE START =====");

/* =====================================================
1. EXECUTION CONTEXT & HOISTING
===================================================== */
hoisted(); // works

function hoisted() {
  console.log("Function hoisted");
}

// console.log(x); // ❌ ReferenceError (TDZ)
let x = 10;

/* =====================================================
2. PRIMITIVES vs REFERENCES
===================================================== */
let a = 10;
let b = a;
b = 20;
console.log(a); // 10

let obj1 = { v: 10 };
let obj2 = obj1;
obj2.v = 20;
console.log(obj1.v); // 20

/* =====================================================
3. TYPE SYSTEM & COERCION
===================================================== */
console.log(typeof null);       // "object" (bug)
console.log("5" + 1);           // "51"
console.log("5" - 1);           // 4
console.log(Boolean([]));       // true
console.log(Boolean({}));       // true

/* =====================================================
4. EQUALITY
===================================================== */
console.log(0 == false);  
console.log(0 === false); 
console.log(Object.is(NaN, NaN));

/* =====================================================
5. STRINGS (IMMUTABLE)
===================================================== */
let s = " Hello ";
console.log(s.trim().toUpperCase());
console.log(s.slice(1, 4));
console.log(s.replace("Hello", "Hi"));

/* =====================================================
6. NUMBERS & IEEE-754
===================================================== */
console.log(0.1 + 0.2);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.isSafeInteger(2 ** 53));

/* =====================================================
7. CONTROL FLOW
===================================================== */
for (let i = 0; i < 2; i++) {
  console.log("for", i);
}

let n = 0;
while (n < 2) {
  console.log("while", n);
  n++;
}

/* =====================================================
8. FUNCTIONS (ALL TYPES)
===================================================== */
function normal(a) {
  return a;
}

const expr = function (a) {
  return a;
};

const arrow = a => a;

(function () {
  console.log("IIFE");
})();

/* =====================================================
9. DEFAULT PARAMS & REST
===================================================== */
function sum(a = 0, ...rest) {
  return rest.reduce((x, y) => x + y, a);
}
console.log(sum(1, 2, 3));

/* =====================================================
10. CLOSURES (CRITICAL)
===================================================== */
function counter() {
  let count = 0;
  return () => ++count;
}

const c = counter();
console.log(c(), c());

/* =====================================================
11. THIS (ALL RULES — SAFE DEMO)
===================================================== */
const user = {
  name: "Alice",
  greet() {
    return this.name;
  }
};

console.log(user.greet()); // ✅ correct method call

const loose = user.greet;

try {
  console.log(loose()); // ❌ this === undefined (strict mode)
} catch (err) {
  console.log("Loose call error:", err.message);
}

// ✅ correct ways
console.log(loose.call(user));
const boundGreet = user.greet.bind(user);
console.log(boundGreet());

/* =====================================================
12. CALL / APPLY / BIND
===================================================== */
function greet(city) {
  return `${this.name} from ${city}`;
}

console.log(greet.call(user, "Delhi"));
console.log(greet.apply(user, ["Mumbai"]));
const bound = greet.bind(user);
console.log(bound("Pune"));

/* =====================================================
13. ARRAYS (MUTABLE)
===================================================== */
let arr = [1, 2, 3];
arr.push(4);
arr.pop();
arr.shift();
arr.unshift(0);

console.log(arr.map(x => x * 2));
console.log(arr.filter(x => x > 1));
console.log(arr.reduce((a, b) => a + b, 0));

/* =====================================================
14. OBJECTS
===================================================== */
let o = { a: 1 };
Object.defineProperty(o, "hidden", {
  value: 42,
  enumerable: false
});

console.log(Object.keys(o));
console.log(o.hidden);

/* =====================================================
15. SHALLOW vs DEEP COPY
===================================================== */
let shallow = { ...obj1 };
let deep = JSON.parse(JSON.stringify(obj1));

/* =====================================================
16. MAP / SET / WEAKMAP
===================================================== */
const map = new Map([[{}, "value"]]);
const set = new Set([1, 1, 2]);

/* =====================================================
17. PROTOTYPE CHAIN
===================================================== */
function A() {}
A.prototype.say = function () {
  return "hi";
};

const aObj = new A();
console.log(aObj.say());

/* =====================================================
18. CLASSES (SYNTAX SUGAR)
===================================================== */
class Person {
  static species = "Human";
  #secret = "x";

  constructor(name) {
    this.name = name;
  }

  greet() {
    return this.name;
  }
}

class Employee extends Person {}

console.log(new Employee("Bob").greet());

/* =====================================================
19. ERROR HANDLING
===================================================== */
try {
  throw new TypeError("fail");
} catch (e) {
  console.log(e.name);
} finally {
  console.log("finally");
}

/* =====================================================
20. PROMISE STATES
===================================================== */
const p = new Promise(resolve => resolve("ok"));
p.then(console.log);

/* =====================================================
21. ASYNC / AWAIT
===================================================== */
async function asyncFn() {
  return "async";
}

asyncFn().then(console.log);

/* =====================================================
22. EVENT LOOP (ORDER)
===================================================== */
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

/* =====================================================
23. MODULE SYSTEM
===================================================== */
console.log(__filename);
console.log(process.argv.slice(2));

/* =====================================================
24. FILE SYSTEM (CORE)
===================================================== */
const fs = require("fs");
fs.writeFileSync("js.txt", "JS CORE");
console.log(fs.readFileSync("js.txt", "utf8"));

/* =====================================================
25. MEMORY CLEANUP (GC IS AUTOMATIC)
===================================================== */
let temp = new Array(1e6).fill(0);
temp = null;

/* =====================================================
PROGRAM END
===================================================== */
console.log("===== JAVASCRIPT CORE END =====");
