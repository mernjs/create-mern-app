const fs = require("fs");
const path = require("path");

const templatesPath = path.join(__dirname, "templates");

const sectionMapping = {
    app: {
        name: "app",
        title: "App Boilerplates",
        description: "App boilerplates provide ready-to-use templates for building applications, simplifying the setup process and ensuring a consistent structure across projects.",
    },
    library: {
        name: "library",
        title: "Library Boilerplates",
        description: "Library boilerplates offer pre-configured templates for creating npm packages, enabling efficient and standardized development of reusable code libraries.",
    },
    packages: {
        name: "packages",
        title: "NPM Packages",
        description: "Explore npm packages that simplify your development workflow. These packages offer efficient solutions for various technologies and are easy to install and integrate, enhancing productivity and code quality.",
    },
    snippets: {
        name: "snippets",
        title: "Code Snippets",
        description: "Explore a collection of reusable code snippets to quickly implement common features and functionalities in your projects.",
    },
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
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => ({
                name: capitalizeWords(dirent.name),
                path: dirent.name,
            }));

        if (projects.length > 0) {
            sections.push({
                name: sectionInfo.name,
                title: sectionInfo.title,
                description: sectionInfo.description,
                projects,
            });
        }
    });

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

<h5 align="center">
If you find this code useful, don't forget to <a href="https://github.com/mernjs/create-mern-app" target="_blank">⭐ star the repo ⭐</a> 
</h5>

<h3 align="center">
🚧 Under Beta Development 🚧
</h3>

#### Create MERN App

Create MERN App provides a simple file and folder structure that you can easily customize to fit your project requirements.

#### Node Version Support

| Version | Supported |
| ------- | --------- |
| node >= 18 | ✅ Yes |
| node < 18 | ❌ No |

#### 📥 Download Methods

You can download the code in two ways:

1. **Using CLI**
2. **Directly Download Zip Code**

#### 1️⃣ Using CLI

- **Pre-configured Project Creation Template:**
  \`\`\`bash
  npx create-mernjs-app my-app
  \`\`\`

- **Pre-configured Library Creation Template:**
  \`\`\`bash
  npx create-mernjs-app my-library --template library
  \`\`\`

- **Pre-built NPM Packages:**
  \`\`\`bash
  npx create-mernjs-app my-package --template packages
  \`\`\`

- **Reusable Code Snippets:**
  \`\`\`bash
  npx create-mernjs-app my-snippets --template snippets
  \`\`\`

#### 2️⃣ Directly Download Zip Code

`;

sections.forEach((section) => {
    readmeContent += `\n#### 📂 ${section.title}\n\n`;
    readmeContent += `${section.description}\n\n`;
    readmeContent += `| # | Name | Download |\n`;
    readmeContent += `| --- | ---- | -------- |\n`;

    section.projects.forEach((item, index) => {
        const itemUrl = `${baseSnippetUrl}/${item.path}`;
        const zipUrl = `${baseZipUrl}/${section.name}/${item.path}.zip`;
        const badge = `![Download](https://custom-icon-badges.herokuapp.com/badge/-Download-blue?style=for-the-badge&logo=download&logoColor=white)`;

        readmeContent += `| ${index + 1} | [${item.name}](${itemUrl}) | [${badge}](${zipUrl}) |\n`;
    });

    readmeContent += `\n---\n`;
});

readmeContent += `

#### 🚀 Key Features

Effortlessly build secure and scalable MERN applications with automated setup, industry-standard coding practices, secure authentication, robust data handling, and proactive security measures.

1. **Effortless Initialization** - Start your MERN project quickly using a simple command-line interface that sets up everything automatically.
2. **Secure Coding Practices** - Follow industry standards to write strong, resilient code.
3. **Well-Defined Folder Structure** - Organized project layout for easy maintenance.
4. **Authentication Ready** - Secure login/signup features using best practices.
5. **ESLint & Prettier** - Auto-formatting & linting for cleaner code.
6. **Tailwind CSS** - Modern styling framework for responsive UI.
7. **Data Encryption** - Secure storage and transmission of data.
8. **Rate Limiting & CORS** - Security controls to prevent misuse.
9. **API Versioning & Monitoring** - Maintainability & performance tracking.
10. **Secure File Uploads & Dependency Scanning** - Enhanced application security.

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
