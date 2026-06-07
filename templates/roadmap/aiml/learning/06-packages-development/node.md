# Mini Node.js Calculator

Publishing a Calculator Package in Node.js on npm

---

## 1. What You Are Building

You are creating a Node.js library that:

* Provides four arithmetic functions:

  * add
  * subtract
  * multiply
  * divide
* Can be installed using npm
* Can be imported into any Node.js or JavaScript project
* Is published to npm, the official Node.js package registry

After publishing, users will be able to do:

```
npm install mini-node-calculator
```

And use it like:

```js
const calc = require("mini-node-calculator");
calc.add(2, 3);
```

or (ESM):

```js
import { add } from "mini-node-calculator";
```

---

## 2. Why Create an npm Package

Publishing an npm package allows you to:

* Share reusable code
* Create utilities used across multiple projects
* Learn real-world JavaScript packaging
* Build open-source libraries
* Distribute internal tools in teams

---

## 3. When This Simple Package Structure Is Best

This approach is ideal when:

* The library is small
* Logic fits in one file
* No complex configuration is required
* You want fast setup and clarity

Avoid this approach for large frameworks or applications.

---

## 4. Prerequisites

Ensure the following are installed:

* Node.js (version 16 or later recommended)
* npm (comes with Node.js)
* Internet connection
* npm account

Check versions:

```
node -v
npm -v
```

---

## 5. Create the Project Directory

Create a new folder for the package.

```
mkdir mini-node-calculator
cd mini-node-calculator
```

Purpose:

* Acts as the root of the npm package
* Holds all configuration and source files

---

## 6. Initialize npm Project

Run:

```
npm init
```

You will be asked several questions.

Recommended answers:

* package name: mini-node-calculator
* version: 1.0.0
* description: A minimal Node.js calculator with basic arithmetic operations
* entry point: index.js
* test command: (leave empty)
* git repository: optional
* keywords: calculator, math, utility
* author: your name
* license: MIT

This creates a file called `package.json`.

---

## 7. Understand package.json (Very Important)

`package.json` is the core configuration file for npm packages.

It defines:

* Package name
* Version
* Entry file
* Exported modules
* Dependencies
* License

npm uses this file to install and distribute your package.

---

## 8. Final Project Structure

After initialization, your project should look like this:

```js
mini-node-calculator/
    index.js
    package.json
    README.md
    .gitignore
```

---

## 9. Write the Calculator Logic

Create or open `index.js`.

```js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide
};
```

---

## 10. Why This Design Works

* Simple named functions
* Clear error handling
* CommonJS export for maximum compatibility
* Works in Node.js immediately

---

## 11. Create README.md

This file appears on the npm package page.

Create `README.md`.

# mini-node-calculator

A minimal Node.js calculator package with basic arithmetic operations.

## Installation

npm install mini-node-calculator

## Usage

const calc = require("mini-node-calculator");

calc.add(2, 3);
calc.subtract(5, 2);
calc.multiply(4, 3);
calc.divide(10, 2);

## Available Functions

add(a, b)
subtract(a, b)
multiply(a, b)
divide(a, b)
```

---

## 12. Why README.md Is Important

* Helps users understand the package
* Increases trust
* Required for professional packages
* Appears directly on npm website

---

## 13. Create .gitignore

Create `.gitignore`.

```
node_modules/
.env
```

Purpose:

* Prevents unnecessary files from being committed
* Keeps repository clean

---

## 14. Test the Package Locally

Before publishing, test locally.

In the same folder:

```
node
```

Then:

```js
const calc = require("./index");
calc.add(2, 3);
```

If this works, your package logic is correct.

---

## 15. Create an npm Account

If you do not already have one:

* Go to npmjs.com
* Sign up
* Verify email

npm account is required to publish packages.

---

## 16. Login to npm from Terminal

Run:

```
npm login
```

Enter:

* Username
* Password
* Email
* One-time password (if 2FA enabled)

This links your terminal to your npm account.

---

## 17. Check Package Name Availability

Before publishing, ensure the name is unique:

```
npm view mini-node-calculator
```

If it exists, choose another name like:

* mini-node-calculator-vijay
* simple-node-calculator

---

## 18. Publish the Package

Run:

```
npm publish
```

If the package is public, this command is enough.

If scoped or restricted:

```
npm publish --access public
```

After this step, the package becomes available on npm.

---

## 19. Install and Use the Published Package

From any project:

```
npm install mini-node-calculator
```

Use it:

```js
const calc = require("mini-node-calculator");

calc.add(10, 20);
```

---

## 20. Versioning Rules in npm

Every update must increment the version in `package.json`.

Example:

```
"version": "1.0.1"
```

Then publish again:

```
npm publish
```

npm does not allow overwriting existing versions.

---

## 21. Common Mistakes to Avoid

* Publishing without testing locally
* Forgetting to update version
* Using a package name that already exists
* Forgetting README.md
* Publishing unnecessary files

---

## 22. When to Use This npm Package Pattern

Use this pattern when:

* Building small utilities
* Sharing helper functions
* Learning npm publishing
* Creating internal tools

---

## 23. When Not to Use This Pattern

Avoid when:

* Building large applications
* Creating frameworks
* Managing many modules

In those cases, use structured folders and build tools.

---

## 24. Summary

You have learned:

* How npm packages work
* How to create a Node.js calculator library
* How to configure package.json
* How to publish on npm
* How versioning works
* Best practices for small Node.js packages

https://www.npmjs.com/package/mini-node-calculator