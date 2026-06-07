/**
 * app.js — COMPLETE JavaScript CORE (Working)
 * No frameworks. No servers. No libraries.
 */

console.log("===== JS CORE START =====");

/* ===============================
1. VARIABLES & DATA TYPES
================================ */
var legacy = "var";
let name = "Alice";
const age = 30;
let active = true;
let nothing = null;
let undef;
let big = 12345678901234567890n;

console.log(name, age, active, nothing, undef, big);

/* ===============================
2. TYPE CHECKING
================================ */
console.log(typeof name, typeof big, Array.isArray([]));

/* ===============================
3. STRINGS
================================ */
let text = " Hello World ";
console.log(text.trim().toUpperCase());
console.log(`User: ${name}, Age: ${age}`);

/* ===============================
4. OPERATORS
================================ */
let total = 10 + 5;
let power = 2 ** 3;
let status = total > 10 ? "High" : "Low";
console.log(total, power, status);

/* ===============================
5. CONTROL FLOW
================================ */
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

for (let i = 0; i < 3; i++) {
  console.log("For:", i);
}

/* ===============================
6. FUNCTIONS
================================ */
function greet(user) {
  return "Hello " + user;
}

const add = (a, b) => a + b;

console.log(greet("Bob"), add(2, 3));

/* ===============================
7. ARRAYS
================================ */
let numbers = [1, 2, 3];
numbers.push(4);

let doubled = numbers.map(n => n * 2);
let filtered = numbers.filter(n => n > 2);
let sum = numbers.reduce((a, b) => a + b, 0);

console.log(numbers, doubled, filtered, sum);

/* ===============================
8. OBJECTS
================================ */
let user = {
  id: 1,
  name: "Alice",
  greet() {
    return "Hi " + this.name;
  }
};

user.city = "Delhi";
delete user.id;

console.log(user, user.greet());

/* ===============================
9. DESTRUCTURING
================================ */
const { name: username } = user;
console.log(username);

/* ===============================
10. SET & MAP
================================ */
const set = new Set([1, 2, 2, 3]);
set.add(4);

const map = new Map();
map.set("a", 1);

console.log([...set], map.get("a"));

/* ===============================
11. DATE & MATH
================================ */
const now = new Date();
console.log(now.toISOString(), Math.sqrt(16));

/* ===============================
12. JSON
================================ */
const json = JSON.stringify(user);
const parsed = JSON.parse(json);
console.log(parsed);

/* ===============================
13. ERROR HANDLING
================================ */
try {
  throw new Error("Test error");
} catch (e) {
  console.log("Caught:", e.message);
} finally {
  console.log("Finally block executed");
}

/* ===============================
14. FILE SYSTEM
================================ */
const fs = require("fs");

fs.writeFileSync("data.txt", "Hello JS");
const fileData = fs.readFileSync("data.txt", "utf8");
console.log("File:", fileData);

/* ===============================
15. CLASSES & OOP
================================ */
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi ${this.name}`;
  }
}

class Employee extends Person {}

const emp = new Employee("Charlie");
console.log(emp.greet());

/* ===============================
16. PROMISE & ASYNC
================================ */
function asyncTask() {
  return new Promise(resolve =>
    setTimeout(() => resolve("Async Done"), 500)
  );
}

async function runAsync() {
  const result = await asyncTask();
  console.log(result);
}

runAsync().then(() => {
  console.log("===== JS CORE END =====");
});
