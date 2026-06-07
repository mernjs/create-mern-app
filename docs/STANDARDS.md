# 📏 Project Standards and Conventions

To keep the **Create MERN App** repository clean, predictable, and easy to navigate for thousands of developers, we strictly follow a set of coding and workflow standards.

Don't worry—these aren't meant to slow you down. They are here to ensure that your code works perfectly for everyone who downloads your templates.

---

## 1. 🧹 Code Formatting and Linting

Consistent code is easier to read, debug, and maintain. 

- **Prettier:** We use Prettier to format all code. It automatically handles spacing, quotes, and line breaks.
- **ESLint:** We use ESLint to catch bugs and bad practices. 
- **TypeScript (Recommended):** Whenever possible, write new templates in TypeScript. It provides better autocomplete for developers and helps AI agents understand your code structure.

> **✅ Do:** Run `npm run lint` (if configured in your template) before submitting your code.
> **❌ Don't:** Submit pull requests with dozens of ESLint warnings. Fix them first!

---

## 2. 📦 Template Conventions

Every folder inside the `templates/` directory is essentially a standalone mini-project. When a developer downloads your template, it needs to work out-of-the-box.

Here are the strict rules for creating a template:

1. **Self-Contained:** Your template must not rely on files outside of its own folder.
2. **Standard Scripts:** Your `package.json` **must** include the following scripts (if applicable to the tech stack):
   - `"start"`: Runs the app in production mode.
   - `"dev"`: Runs the app in development mode with hot-reloading.
   - `"build"`: Compiles the app.
3. **Template README:** You **must** include a `README.md` inside your template folder. It should explain:
   - What the template is.
   - How to install dependencies (`npm install`).
   - What environment variables are needed (`.env.example`).
   - How to run the project.
4. **No Junk Files:** Absolutely **NO** `node_modules`, `.env` files containing real secrets, `.DS_Store` files, or build folders (`dist/`, `build/`).

> **💡 Example of a good template structure:**
> ```text
> templates/app/my-awesome-template/
> ├── src/
> ├── package.json
> ├── .gitignore      <-- Crucial! Must ignore node_modules
> ├── .env.example    <-- Blank template for env variables
> └── README.md       <-- Setup instructions
> ```

---

## 3. 🌳 Git and GitHub Workflow

We use a structured way of branching and committing. This keeps our GitHub history readable and makes generating release notes automatic.

### Branch Naming
Create a new branch for your work using these prefixes:
- `feature/` - For adding a new template or feature (e.g., `feature/add-nestjs-template`)
- `bugfix/` - For fixing an issue (e.g., `bugfix/fix-express-cors-error`)
- `docs/` - For updating documentation (e.g., `docs/update-readme`)

### Conventional Commits
Your commit messages must be clear and structured. We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.

**✅ Good Commit Messages:**
- `feat: add react-vite boilerplate`
- `fix: resolve dependency vulnerability in express template`
- `docs: improve AI workflow guidelines`

**❌ Bad Commit Messages:**
- `added new template`
- `fixed bug`
- `wip`

---

## 4. 📝 Documentation Standards

- **Use Markdown:** All documentation must be written in GitHub Flavored Markdown (`.md`).
- **Keep it Simple:** Use plain English. Break long paragraphs into bullet points.
- **Provide Examples:** If you are explaining a concept, provide a code snippet.

---

## 5. 🔒 Security Best Practices

Security is non-negotiable. Many developers rely on our boilerplates to start their companies.

- **No Secrets:** Never hardcode API keys, database passwords, or JWT secrets in your code. Use `process.env`.
- **Dependency Health:** Don't use outdated or deprecated npm packages. 
- **Security Headers:** If you are building a backend boilerplate, include security middleware (like `helmet` for Express).

If you find a security vulnerability in our repository, please **do not open a public issue**. Follow the instructions in `SECURITY.md` to report it privately.
