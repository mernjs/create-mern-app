# 🤝 Contributing Guidelines

First off, thank you for considering contributing to the **Create MERN App** ecosystem! 🎉 

Whether you are a seasoned open-source contributor, a beginner making your first Pull Request, or a developer pairing with an AI agent, this guide will walk you through the process step-by-step.

---

## 🛠️ Step 1: Getting Your Local Environment Ready

Before you can write code, you need to set up the repository on your local machine.

1. **Fork the Repository:** Click the "Fork" button at the top right of this GitHub page to create a copy in your own account.
2. **Clone your Fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/create-mern-app.git
   cd create-mern-app
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Create a Branch:** Create a new branch for your work. (See our [Standards Guide](docs/STANDARDS.md) for naming conventions).
   ```bash
   git checkout -b feature/my-awesome-new-template
   ```

---

## 🚀 Step 2: How to Add a New Template

Adding a new boilerplate, snippet, or library is the most common way to contribute.

1. **Choose the Right Category:**
   Navigate to the `templates/` folder and decide where your project belongs:
   - `app/` (Full web/mobile apps)
   - `library/` (NPM package starters)
   - `snippets/` (Small code utilities)
   - `others/` (Python, Go, etc.)
   
2. **Create Your Folder:**
   Create a folder with a simple, descriptive name using dashes (e.g., `templates/app/sveltekit-boilerplate`).

3. **Write Your Code:**
   Build your template inside that folder. **Make sure it is self-contained!** It needs its own `package.json`, `.gitignore`, and `README.md`.
   *(Tip: Do not include `node_modules` or `.env` files with real secrets).*

4. **Test Your Template Locally:**
   Inside your template folder, run `npm install` and `npm start` to ensure it actually works.

---

## 🔄 Step 3: Updating the Registry (Crucial Step!)

Once your template is built, you need to tell the root repository that it exists so users can download it.

1. **Generate the README:**
   Go back to the root folder of the project (`cd ../../../`) and run the auto-generator script:
   ```bash
   node generate-readme.js
   ```
   *This script scans the `templates/` folder and dynamically updates the main `README.md` with a link to your new template!*

2. **Zip the Templates:**
   The CLI downloads templates as `.zip` files. You need to generate the zip file for your new template by running:
   ```bash
   npm run zip
   ```
   *(This will run a script that packages everything up nicely).*

---

## 📚 Step 4: Contributing to the Roadmap (Knowledge Base)

If you aren't adding code, but want to add tutorials, interview questions, or architecture guides, you'll be working in the `templates/roadmap/` folder.

1. Navigate to the relevant domain (e.g., `templates/roadmap/mern/learning`).
2. Add a new Markdown file or update an existing one.
3. Keep the language simple, provide code examples, and structure your document with clear `## Headings`.
4. Run `node generate-readme.js` in the root folder when you are done.

---

## ✅ Step 5: Submitting Your Pull Request (PR)

You've written your code, updated the README, and tested everything. Now it's time to merge!

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add sveltekit boilerplate template"
   ```
   *(Remember to use Conventional Commits!)*

2. **Push to your Fork:**
   ```bash
   git push origin feature/my-awesome-new-template
   ```

3. **Open a Pull Request:**
   Go to the original Create MERN App GitHub repository. You should see a green button that says "Compare & pull request". Click it!
   
4. **Fill out the PR details:**
   Provide a clear summary of what you added and why it's valuable. If it fixes an open issue, mention it (e.g., "Fixes #42").

### What happens next?
Our maintainers will review your code. We might leave some comments or ask for minor changes. Once everything looks good, we'll merge it, and your code will be available to thousands of developers via `npx create-mernjs-app`!

Thank you for contributing! 🚀