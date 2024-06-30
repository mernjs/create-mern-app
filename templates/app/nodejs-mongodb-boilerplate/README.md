# Project Name

## Overview

This project is a web application built using Node.js and Express.js, following the MVC (Model-View-Controller) architecture. It includes features like user authentication, input validation, and API security practices.

## Project Guidelines

### 1. File Organization

- **Routes**: Define application routes.
- **Utilities**: Common utility functions.
- **Controllers**: Business logic and request handling.
- **Configuration**: Server and environment settings.

### 2. Consistent Naming Conventions

- **camelCase** for variables and functions (e.g., `apiResponse`, `decryptRequestBody`).
- **PascalCase** for class names (e.g., `AuthController`, `CrudController`).
- **UPPERCASE with underscores** for environment variables (e.g., `APP_DEBUG`, `JWT_SECRET`).

### 3. Error Handling

- Asynchronous functions use `try-catch` blocks for error handling.
- Errors are passed to the `apiResponse` function for consistent responses.

### 4. Environment Configuration

- Environment variables are used for configuration (e.g., `process.env.APP_DEBUG`, `process.env.JWT_SECRET`).
- `dotenv` library is used to load environment variables from a `.env` file.

### 5. Asynchronous Programming

- `async/await` syntax is used for handling asynchronous operations for improved readability and maintainability.

### 6. Input Validation

- **Zod** library is used for validating input data in `AuthController`.

### 7. Security Practices

- **Decryption Middleware**: `decryptRequestBody` for request body decryption.
- **API Key Validation Middleware**: `apiKeyValidate` for validating API keys.
- **JWT Authentication**: `signAccessToken` and `verifyAccessToken` functions for token management.
- **CORS Configuration**: Configured to allow specific origins.
- **Rate Limiting**: `setRateLimit` middleware to prevent abuse.
- **Password Hashing**: **bcrypt** library is used for hashing passwords.
- **Encryption/Decryption**: **CryptoJS** library is used for data encryption and decryption.

### 8. Database Operations

- **Mongoose** library is used for MongoDB interactions (e.g., `User.findOne`, `user.save()`).
- **mongoose-paginate-v2** for pagination of MongoDB queries.

### 9. API Response Structure

- Consistent API response structure is maintained using the `apiResponse` function.

### 10. Code Comments

- Comments are included to explain complex logic and important code sections.

### 11. Dependency Management

- External libraries are required at the top of each file.
- **npm** is used for package management.
- Regular updates are managed with an upgrade script.

### 12. Logging and Monitoring

- **Morgan** library for HTTP request logging.
- Conditional console logging based on `APP_DEBUG` environment variable.
- **Sentry** integration for error tracking and performance monitoring.

### 13. Express.js Best Practices

- Middleware functions are used for common tasks (e.g., body parsing, static file serving).
- Routes are organized in a `Routes.js` file.

### 14. Code Formatting and Linting

- **ESLint** for code linting following [Google’s ESLint configuration](https://github.com/google/eslint-config-google).
- **Prettier** for code formatting.
- npm scripts are available for linting and formatting tasks.

### 15. Development and Production Scripts

- **Development**: `npm run dev` – Uses **Nodemon** to restart the server on file changes.
- **Production**: `npm start` – Runs the server in production mode.

### 16. Deployment Scripts

- **Forever.js** process manager commands:
  - **Start**: `npm run forever-start`
  - **Restart**: `npm run forever-restart`
  - **Stop**: `npm run forever-stop`

### 17. Testing

- **Faker** library for generating fake data used in testing scenarios.

### 18. Version Control

- **npm** for package management and dependency updates.
- Script included to check for and update dependencies.

### 19. Database Management

- A script is included for running database migrations.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/project-name.git
   cd project-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** from the `.env.example` template and configure your environment variables.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Scripts

- **Development**: `npm run dev`
- **Production**: `npm start`
- **Run Migrations**: `npm run migrate`
- **Start Forever**: `npm run forever-start`
- **Restart Forever**: `npm run forever-restart`
- **Stop Forever**: `npm run forever-stop`
