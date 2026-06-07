const fs = require("fs");
const path = require("path");

const templatesPath = path.join(__dirname, "templates");

const sectionMapping = {
    app: {
        name: "app",
        title: "App Boilerplates",
        description: "App boilerplates provide ready-to-use templates for building applications, simplifying the setup process and ensuring a consistent structure across projects.",
        hasZip: true
    },
    library: {
        name: "library",
        title: "Library Boilerplates",
        description: "Library boilerplates offer pre-configured templates for creating npm packages, enabling efficient and standardized development of reusable code libraries.",
        hasZip: true
    },
    packages: {
        name: "packages",
        title: "NPM Packages",
        description: "Explore npm packages that simplify your development workflow. These packages offer efficient solutions for various technologies and are easy to install and integrate, enhancing productivity and code quality.",
        hasZip: true
    },
    snippets: {
        name: "snippets",
        title: "Code Snippets",
        description: "Explore a collection of reusable code snippets to quickly implement common features and functionalities in your projects.",
        hasZip: true
    },
    roadmap: {
        name: "roadmap",
        title: "Learning & Interview Roadmaps (AI Brain)",
        description: "A centralized knowledge repository for learning, interview preparation, architecture design, and continuous professional growth across various tech stacks. Optimized for both human developers and AI coding agents.",
        hasZip: false
    },
    others: {
        name: "others",
        title: "Other Templates & Resources",
        description: "Additional templates, boilerplates, and miscellaneous resources for varied project needs.",
        hasZip: true
    }
};

const capitalizeWords = (str) => str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const sections = [];

fs.readdirSync(templatesPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .forEach((category) => {
        const categoryPath = path.join(templatesPath, category.name);
        const sectionInfo = sectionMapping[category.name];

        if (!sectionInfo) return;

        const projects = fs.readdirSync(categoryPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'))
            .map((dirent) => ({
                name: capitalizeWords(dirent.name),
                path: dirent.name,
            }));

        if (projects.length > 0) {
            sections.push({
                name: sectionInfo.name,
                title: sectionInfo.title,
                description: sectionInfo.description,
                hasZip: sectionInfo.hasZip,
                projects,
            });
        }
    });

// Sort sections based on the order in sectionMapping
const orderedSectionNames = Object.keys(sectionMapping);
sections.sort((a, b) => orderedSectionNames.indexOf(a.name) - orderedSectionNames.indexOf(b.name));

const baseRepoUrl = "https://github.com/mernjs/create-mern-app";
const baseZipUrl = `${baseRepoUrl}/raw/master/zip`;
const baseSnippetUrl = `${baseRepoUrl}/tree/master/templates`;

let readmeContent = `
# [![MIT License](https://img.shields.io/github/license/mernjs/create-mern-app)](https://github.com/mernjs/create-mern-app/blob/master/LICENSE) [![NPM Version](https://img.shields.io/npm/v/create-mernjs-app)](https://www.npmjs.com/package/create-mernjs-app) [![NPM Downloads](https://img.shields.io/npm/dy/create-mernjs-app)](https://www.npmjs.com/package/create-mernjs-app) [![Follow](https://img.shields.io/github/followers/mernjs?style=social)](https://github.com/mernjs?tab=followers) [![Watch](https://img.shields.io/github/watchers/mernjs/create-mern-app?style=social)](https://github.com/mernjs/create-mern-app/watchers) [![Fork](https://img.shields.io/github/forks/mernjs/create-mern-app?style=social)](https://github.com/mernjs/create-mern-app/network/members) [![Star](https://img.shields.io/github/stars/mernjs/create-mern-app?style=social)](https://github.com/mernjs/create-mern-app/stargazers)

<p align="center">
  <a href="https://mernjs.github.io/create-mern-app" target="_blank">
    <img src="https://mernjs.github.io/create-mern-app/assets/logo1.png" alt="Logo">
  </a>
</p>

<h5 align="center">Set up a modern web, mobile, and desktop app by running one command.</h5>
<h5 align="center">Optimized for Developers & AI Coding Agents</h5>

<h5 align="center">
If you find this code useful, don't forget to <a href="https://github.com/mernjs/create-mern-app" target="_blank">⭐ star the repo ⭐</a> 
</h5>

<h3 align="center">
🚧 Under Beta Development 🚧
</h3>

## 📖 Welcome to the Developer Guide

Welcome to the **Create MERN App** ecosystem! Whether you want to quickly start a new React project, find a handy Node.js snippet, or prepare for a system design interview, you are in the right place.

This repository is more than just a CLI tool—it's a massive, open-source library of pre-configured code templates and a deep-dive knowledge base.

---

### 🗺️ Navigate the Project

To help you get the most out of this repository, we've broken down our documentation into simple, easy-to-read guides:

1. **[🏗️ Project Architecture](docs/ARCHITECTURE.md)**
   *Curious how the CLI fetches templates? Want to know where files are stored? Start here for a plain-English breakdown of how the repository works under the hood.*

2. **[🤖 AI-Assisted Workflow](docs/AI_WORKFLOW.md)**
   *We built this repo to work perfectly with AI tools like Cursor, GitHub Copilot, and Claude. Read this guide to learn the exact prompts to use to make the AI build templates for you.*

3. **[📏 Standards & Conventions](docs/STANDARDS.md)**
   *Learn how we use Prettier, ESLint, and Conventional Commits to keep our code clean and professional. A must-read before you submit code!*

4. **[🤝 How to Contribute](CONTRIBUTING.md)**
   *Ready to add your own boilerplate or fix a bug? This step-by-step tutorial will walk you through cloning the repo, adding your code, and opening your first Pull Request.*

---

## ⚡ Getting Started (How to use the CLI)

Starting a new project is incredibly easy. You don't need to manually download or clone anything. Just use the \`npx\` command in your terminal.

### 📋 Prerequisites
Make sure you have Node.js installed.
| Node Version | Supported |
| ------------ | --------- |
| Node >= 18   | ✅ Yes    |
| Node < 18    | ❌ No     |

### 💻 Command Line Examples

**1. Create a Full Application (like Next.js or React Native)**
\`\`\`bash
npx create-mernjs-app my-awesome-app
\`\`\`
*(The CLI will give you an interactive menu to choose your tech stack!)*

**2. Create an NPM Package Library**
\`\`\`bash
npx create-mernjs-app my-custom-library --template library
\`\`\`

**3. Download a Pre-Built NPM Package**
\`\`\`bash
npx create-mernjs-app my-package-setup --template packages
\`\`\`

**4. Grab a Code Snippet (e.g., JWT Authentication logic)**
\`\`\`bash
npx create-mernjs-app my-auth-snippet --template snippets
\`\`\`

> **Prefer manual downloads?** No problem. You can browse the tables below and click the **Download** badges to get the raw '.zip' files instantly.

---
`;

sections.forEach((section) => {
    readmeContent += `\n#### 📂 ${section.title}\n\n`;
    readmeContent += `${section.description}\n\n`;
    
    if (section.hasZip) {
        readmeContent += `| # | Name | Download |\n`;
        readmeContent += `| --- | ---- | -------- |\n`;
    } else {
        readmeContent += `| # | Name | View |\n`;
        readmeContent += `| --- | ---- | ---- |\n`;
    }

    section.projects.forEach((item, index) => {
        const itemUrl = `${baseSnippetUrl}/${section.name}/${item.path}`;
        
        if (section.hasZip) {
            const zipUrl = `${baseZipUrl}/${section.name}/${item.path}.zip`;
            const badge = `![Download](https://custom-icon-badges.herokuapp.com/badge/-Download-blue?style=for-the-badge&logo=download&logoColor=white)`;
            readmeContent += `| ${index + 1} | [${item.name}](${itemUrl}) | [${badge}](${zipUrl}) |\n`;
        } else {
            const badge = `![View](https://custom-icon-badges.herokuapp.com/badge/-View-blue?style=for-the-badge&logo=github&logoColor=white)`;
            readmeContent += `| ${index + 1} | [${item.name}](${itemUrl}) | [${badge}](${itemUrl}) |\n`;
        }
    });

    readmeContent += `\n---\n`;
});

readmeContent += `
#### 🚀 Key Features

Effortlessly build secure and scalable applications with automated setup, industry-standard coding practices, and proactive security measures.

1. **Effortless Initialization** - Start your project quickly using a simple command-line interface.
2. **Secure Coding Practices** - Follow industry standards to write strong, resilient code.
3. **Well-Defined Folder Structure** - Organized project layout for easy maintenance.
4. **AI-Ready Documentation** - Explicit documentation meant for both human devs and AI coding agents.
5. **ESLint & Prettier** - Auto-formatting & linting for cleaner code.
6. **Modern Tooling** - Deep integration with Tailwind CSS, Next.js, Fastify, and more.
7. **Security Controls** - Rate Limiting, CORS, Data Encryption implemented by default in templates.

#### 💬 Support

For queries, suggestions, or security concerns, please reach out via [GitHub Discussions](https://github.com/mernjs/create-mern-app/discussions).

---

<p align="center">
  <span>© 2023 <a href="https://github.com/mernjs/create-mern-app/blob/master/LICENSE" target="_blank"> Create MERN App</a></span> |
  <span><b>By:</b> <a href="https://linkedin.com/in/vprtsingh" target="_blank"> Vijay Pratap Singh</a></span>
</p>
`;

fs.writeFileSync("README.md", readmeContent, "utf8");

console.log("✅ README.md generated successfully!");

