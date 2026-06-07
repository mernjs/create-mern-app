# 🏗️ Project Architecture: A Developer's Guide

Welcome to the **Create MERN App** architecture guide! We designed this project to be as simple and predictable as possible. Whether you're debugging an issue, adding a new template, or hooking up an AI agent, this document will help you understand exactly how the pieces fit together.

---

## 🗺️ The 10,000-Foot View

At its core, this repository does three things:
1. **Stores Templates:** Pre-configured project starters (React, Next.js, Fastify, etc.).
2. **Generates Projects:** A CLI tool (`npx create-mernjs-app`) that copies those templates to a user's local machine.
3. **Acts as a Knowledge Base:** A centralized learning hub (`roadmap/`) for AI agents and developers.

Here is how the repository is structured:

```text
create-mern-app/
├── packages/
│   └── create-mernjs-app/   <-- The CLI logic lives here
├── templates/                 <-- All the starter templates
│   ├── app/
│   ├── library/
│   ├── packages/
│   ├── snippets/
│   ├── others/
│   └── roadmap/             <-- The Knowledge Base / "AI Brain"
├── docs/                      <-- You are here!
├── scripts/                   <-- Automation scripts (zipping, cleaning)
└── generate-readme.js         <-- Auto-generates the root README.md
```

---

## 🔍 Deep Dive into Key Components

### 1. The CLI (`packages/create-mernjs-app`)
This is the tool developers run when they type `npx create-mernjs-app <project-name>`.

**How it works under the hood:**
- When a user runs the CLI, it fetches a `.zip` file of the requested template directly from this GitHub repository's `master` branch.
- It unzips the files into the user's specified directory.
- It installs the dependencies (running `npm install`).

> **💡 Developer Tip:** If you want to modify how the CLI prompts the user or fetches templates, look inside the `packages/create-mernjs-app/bin/` folder.

### 2. The Template Registry (`templates/`)
This is where the actual code boilerplates live. We organize them by use case so developers can easily find what they need.

- **`app/`**: Full applications. Examples: `nextjs-boilerplate`, `react-native-boilerplate`.
- **`library/`**: Starters for building your own npm packages. Examples: `reactjs-library-boilerplate`.
- **`packages/`**: Complete, published npm packages maintained by us. Example: `xml-to-json-chunk-processor`.
- **`snippets/`**: Smaller, single-purpose code blocks. Example: `node-express-jwt`.
- **`others/`**: Miscellaneous templates like Python/Flask/Django setups.

**Adding a new template is easy!** You just create a new folder inside one of these categories, add your code, and run `npm run zip`. (See [CONTRIBUTING.md](../CONTRIBUTING.md) for a full walkthrough).

### 3. The Roadmap / AI Brain (`templates/roadmap/`)
This isn't code you download; it's a massive Markdown knowledge base. We created this because AI coding agents (and humans!) need a single source of truth for architectural standards, system design, and interview prep.

- **`learning/`**: Deep dives into concepts (e.g., how the Node.js event loop works).
- **`interview/`**: Scenario-based questions and system design architecture.

> **💡 AI Integration:** You can point tools like Cursor or GitHub Copilot to a specific folder here (e.g., `templates/roadmap/genai`) to give the AI context on how we expect GenAI features to be built.

### 4. Automation Scripts (`scripts/`)
Because we have dozens of templates, maintaining them manually is impossible. We use bash scripts to automate repetitive tasks across all templates at once.

- **`npm run app-install`**: Runs `npm install` inside *every* template in the `app/` folder.
- **`npm run zip`**: Zips up every template and prepares it for the CLI to download.
- **`node generate-readme.js`**: Re-builds the main `README.md` file by scanning the `templates/` folder.

---

## 🚀 Example: The Lifecycle of a User Command

Want to know exactly what happens when someone uses our tool?

1. User types: `npx create-mernjs-app my-new-app`
2. The CLI (from `packages/create-mernjs-app`) executes.
3. The CLI prompts the user: *"Which template do you want?"*
4. User selects *"Next.js Boilerplate"*.
5. The CLI sends an HTTP GET request to `https://github.com/mernjs/create-mern-app/raw/master/zip/app/nextjs-boilerplate.zip`.
6. The zip file is downloaded, extracted into a folder named `my-new-app`.
7. The CLI runs `npm install` in `my-new-app`.
8. The user is ready to code!

By keeping the templates as simple folders that get zipped up, we ensure that adding a new template is as easy as creating a folder and writing good code.
