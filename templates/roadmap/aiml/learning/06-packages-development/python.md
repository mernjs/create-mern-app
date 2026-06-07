# Mini Pytho Calculator

Publishing a Single-File Python Package on PyPI
Package name: `mini-python-calculator`

---

## 1. What You Are Building

You are creating a Python library that:

* Consists of a single Python file named `calculator.py`
* Provides four arithmetic functions:
  * add
  * subtract
  * multiply
  * divide
* Can be installed globally using pip
* Is distributed using PyPI, the official Python package repository

This type of package is commonly used for:

* Small utility libraries
* Teaching and learning Python packaging
* Sharing reusable helper functions
* Internal tools in teams
* Demonstration projects

---

## 2. Why Use a Single-File Package

A single-file package is appropriate when:

* The logic is small and self-contained
* There is no need for submodules
* The package is easy to understand and maintain
* You want minimal setup and minimal overhead

This approach should not be used for:

* Large applications
* Complex systems
* Libraries with multiple components

---

## 3. Prerequisites

Before starting, ensure the following:

* Python version 3.8 or higher is installed
* You have access to a terminal or command prompt
* You have an internet connection
* You have or will create a PyPI account

Check Python version:

```
python --version
```

---

## 4. Create the Project Directory

Create a new directory that will contain all project files.

```
mkdir mini-python-calculator
cd mini-python-calculator
```

Purpose of this directory:

* Acts as the root of the project
* Keeps all files organized
* Is required for packaging tools to work correctly

---

## 5. Create and Use a Virtual Environment

### What a Virtual Environment Is

A virtual environment is an isolated Python environment that allows you to install packages without affecting the system-wide Python installation.

### Why It Is Necessary

* Prevents dependency conflicts
* Avoids breaking system Python
* Ensures reproducible builds
* Recommended by Python and PyPI

### Create the Virtual Environment

```
python -m venv venv
```

### Activate the Virtual Environment

On macOS or Linux:

```
source venv/bin/activate
```

On Windows:

```
venv\Scripts\activate
```

After activation, the terminal prompt will show the environment name.

---

## 6. Install Packaging Tools Inside the Virtual Environment

Install the tools required to build and upload the package.

```
pip install --upgrade pip setuptools wheel build twine
```

### Explanation of Each Tool

pip
Installs and manages Python packages.

setuptools
Builds Python source code into installable packages.

wheel
Creates wheel files, which are faster to install.

build
Modern tool that builds both source and wheel distributions.

twine
Uploads built packages securely to PyPI.

These tools are used only during development and publishing.

---

## 7. Final Project Structure

Your project directory must contain the following files:

```
mini-python-calculator/
    calculator.py
    pyproject.toml
    README.md
    LICENSE
    .gitignore
    requirements.txt (optional)
```

Each file has a specific purpose that will be explained later.

---

## 8. Write the Library Code

Create the main Python file that contains your calculator logic.

File name: calculator.py

```
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Division by zero is not allowed")
    return a / b
```

### Why This Design Is Used

* Functions are simple and reusable
* No side effects
* Clear error handling
* Easy to test and understand

---

## 9. Create README.md

README.md is the primary documentation file shown on PyPI.

PyPI requires a valid README file. Uploads without it will fail.

File name: README.md

```
# mini-python-calculator

A minimal Python calculator package with basic arithmetic operations.

Installation:
pip install mini-python-calculator

Usage:
import calculator

calculator.add(2, 3)
calculator.subtract(5, 2)
calculator.multiply(4, 3)
calculator.divide(10, 2)
```

### Why README.md Is Required

* Acts as the package homepage
* Explains how to install and use the package
* Increases trust and usability

---

## 10. Create pyproject.toml

This is the most important file in the project.

It defines:

* Package name
* Version
* Author information
* Python compatibility
* Build configuration
* That the package is a single-file module

File name: pyproject.toml

```
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "mini-python-calculator"
version = "0.1.0"
description = "A minimal Python calculator with add, subtract, multiply and divide"
readme = "README.md"
requires-python = ">=3.8"

authors = [
  { name = "Vijay", email = "your-email@example.com" }
]

license = { text = "MIT" }

classifiers = [
  "Programming Language :: Python :: 3",
  "License :: OSI Approved :: MIT License",
  "Operating System :: OS Independent"
]

[tool.setuptools]
py-modules = ["calculator"]

[project.urls]
Homepage = "https://github.com/yourusername/mini-python-calculator"
```

### Critical Explanation

The line:

```
py-modules = ["calculator"]
```

tells setuptools that the package consists of a single Python file. Without this line, the package will install but cannot be imported.

---

## 11. Create LICENSE File

A license defines how others are allowed to use your code.

MIT License is recommended for simplicity.

File name: LICENSE

Include the full MIT license text.

### Why a License Is Important

* Legally allows others to use your code
* Required by many companies
* Increases adoption and trust

---

## 12. Create .gitignore

This file prevents unnecessary files from being committed to version control.

File name: .gitignore

```
__pycache__/
build/
dist/
*.egg-info/
venv/
.env
```

---

## 13. Optional: Create requirements.txt

This file is used for development dependencies only.

It is not used by PyPI.

File name: requirements.txt

```
build
twine
setuptools
wheel
```

Purpose:

* Easier environment setup
* Useful for CI/CD pipelines

---

## 14. Build the Package

From the project root directory, run:

```
python -m build
```

This command:

* Validates the project configuration
* Creates installable files
* Ensures the package is ready for PyPI

Output directory:

```
dist/
    mini_python_calculator-0.1.0-py3-none-any.whl
    mini-python-calculator-0.1.0.tar.gz
```

If this step fails, do not upload the package.

---

## 15. Create a PyPI Account

Register an account on the Python Package Index.

Purpose:

* PyPI is the official repository for Python packages
* Required to publish packages publicly

Two-factor authentication is mandatory.

---

## 16. Create a PyPI API Token

API tokens are used instead of passwords.

Reasons:

* More secure
* Can be revoked
* Required by PyPI

---

## 17. Upload the Package to PyPI

Upload the built package using:

```
twine upload dist/*
```

Login details:

* Username: **token**
* Password: your API token

After successful upload, the package becomes publicly available.

---

## 18. Install and Use the Published Package

Install the package:

```
pip install mini-python-calculator
```

Use it in Python:

```
import calculator
calculator.add(10, 20)
```

---

## 19. Versioning Rules

Each upload must use a new version number.

Example:

```
version = "0.1.1"
```

Reason:

* PyPI does not allow overwriting existing versions
* Follows semantic versioning standards

---

## 20. When to Use This Approach

This single-file packaging approach is ideal for:

* Utility libraries
* Educational projects
* Internal tools
* Simple reusable functions

---

## 21. When Not to Use This Approach

Avoid this approach when:

* The project grows large
* Multiple modules are required
* Complex dependencies are involved

In those cases, use a package directory structure.

---

## 22. Summary

You have learned:

* How to create a single-file Python package
* Why each file exists
* How PyPI packaging works
* How to build and publish a package
* Best practices for small Python libraries

https://pypi.org/project/mini-python-calculator