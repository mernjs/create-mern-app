# 🤖 AI-Assisted Development Workflow

Software development is evolving. This repository is specifically designed to work hand-in-hand with modern AI coding assistants like **Cursor, Windsurf, GitHub Copilot, and Claude Code**. 

We’ve structured our folders, documentation, and code so that AI agents can quickly understand the context and help you build faster, with fewer bugs.

Here is a simple, step-by-step guide on how to get the most out of AI when working in this repository.

---

## 🧠 1. Give Your AI the Right Context

AI tools are incredibly smart, but they need context to understand *how* we write code here. Before you ask an AI to write a new feature or fix a bug, point it to our documentation.

**Practical Example (Using Cursor or Claude Code):**
Imagine you want to add a new Fastify template.

1. Open your AI Chat panel.
2. Tag the architecture and standards docs so the AI knows the rules.
   > **Prompt:** *"Please read `@docs/ARCHITECTURE.md` and `@docs/STANDARDS.md` to understand how this repository works. I want to add a new Fastify template."*
3. The AI will immediately know that templates belong in the `templates/` folder, must be self-contained, and must not include `node_modules`.

---

## 🏗️ 2. Scaffolding with AI

Let's say you want to build a new template, but you don't want to start from scratch. You can use an existing template as an architectural baseline for the AI.

**Practical Example:**
You want to create a `nestjs-boilerplate`.

> **Prompt:** *"Look at `@templates/app/nextjs-expressjs-boilerplate`. I want to create a new template in `templates/app/` called `nestjs-boilerplate`. Please generate a basic NestJS app structure for me, ensuring you include a `package.json` with `start`, `build`, and `lint` scripts, and a `README.md` explaining how to run it. Ensure it follows the rules in `@docs/STANDARDS.md`."*

The AI will output the exact folder structure and files needed, perfectly adhering to our conventions.

---

## 📚 3. Using the Roadmap as an "AI Brain"

The `templates/roadmap/` folder is unique. It's a massive Markdown knowledge base covering everything from AI/ML to DevOps. We built this so you can give your AI deep domain expertise on demand.

**Practical Example:**
You are working on a new snippet that integrates MongoDB, but you aren't sure about the best practices for indexing.

> **Prompt:** *"Please read `@templates/roadmap/mern/learning` to understand standard MongoDB optimization practices. Based on those practices, write a Node.js script that connects to MongoDB and creates optimized indexes for a user profile collection."*

Because the AI reads our curated roadmap first, the code it generates will be highly optimized and aligned with industry standards, rather than generic stack-overflow copy-paste.

---

## 🔄 4. Automating Boring Tasks

Once you've built your new template or fixed a bug, there are administrative tasks to do. Let the AI handle them!

**Updating the README:**
When you add a new template, the root `README.md` needs to be updated. Don't do it manually!
> **Prompt:** *"I just added a new template called `nestjs-boilerplate`. Please run the command `node generate-readme.js` in the terminal to update the main README for me."*

**Writing Commit Messages:**
> **Prompt:** *"Review my staged changes. Write a commit message following the Conventional Commits format as specified in `@docs/STANDARDS.md`."*

---

## 🎯 Summary Checklist for AI Usage

- [ ] **Context First:** Always tag `docs/STANDARDS.md` in your first prompt.
- [ ] **Use Examples:** Tag existing templates (e.g., `@templates/app/nextjs-boilerplate`) to show the AI how we format things.
- [ ] **Leverage the Roadmap:** Use the `roadmap/` folder to feed the AI best practices.
- [ ] **Automate:** Ask the AI to run `npm run zip` and `node generate-readme.js` for you.

By following these simple patterns, you'll find that contributing to Create MERN App feels like having a senior engineer pairing with you at all times!
