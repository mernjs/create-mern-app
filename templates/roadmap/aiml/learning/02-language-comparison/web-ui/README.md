# Project Name

## Overview

This project is a React application utilizing Redux for state management, RTK Query for API integration, and various best practices for optimal performance, security, and maintainability.

## Project Structure

```
src/
|-- components/           # Reusable UI components
|-- features/             # Redux slices, async thunks, and selectors
|   |-- auth/             # Authentication-related logic
|   |-- core/             # Core application logic
|   |-- user/             # User-related logic
|-- pages/                # Page-level components
|-- services/             # API calls and services
|-- utils/                # Utility functions and helpers
|-- App.js                # Main App component
|-- Store.js              # Redux store configuration
|-- index.js              # Application entry point
|-- App.css               # Global styles
```

## Coding Standards and Guidelines

### 1. Project Structure

- **Separate files** for different concerns (e.g., `App.js`, `Store.js`, `Utilities.js`, `UserServices.js`).
- **Clear separation of reducers** (e.g., `AuthReducer.js`, `CoreReducer.js`, `UserReducer.js`).

### 2. React Best Practices

- **Functional Components and Hooks**: Use functional components and React hooks (`useEffect`, `useDispatch`, custom hooks).
- **Suspense**: Implement `React.Suspense` for lazy loading components.
- **PropTypes**: Use for type checking (recommended, not seen in all files).
- **React.StrictMode**: Enabled for identifying potential issues.

### 3. State Management

- **Redux**: Global state management with Redux.
- **Redux Toolkit**: Simplified Redux logic using `createSlice`.
- **Redux Persist**: For persisting and rehydrating the Redux store.
- **Action Naming**: Clear and descriptive action names in reducers.

### 4. Routing

- **React Router**: For navigation and routing.
- **Protected Routes**: Implementation of `AuthRoute` and `PrivateRoute` for route protection.
- **Navigation**: Use `Link` component for navigation.

### 5. API Integration

- **RTK Query**: Data fetching and caching.
- **Axios**: Custom Axios instance with interceptors for request/response handling.
- **apiRequest Utility**: Consistent API call patterns.
- **Error Handling**: Use `try-catch` for API calls.

### 6. Form Handling

- **react-hook-form**: Consistent form management.
- **Controller Component**: For form field control.

### 7. Error Handling and Logging

- **Sentry**: For error tracking and monitoring.
- **Custom Error Handlers**: For various scenarios.
- **Conditional Logging**: Based on debug mode.
- **showToast Utility**: For displaying error messages.

### 8. Code Splitting

- **React.lazy()**: For code splitting and performance optimization.

### 9. Styling

- **CSS Modules** or **CSS-in-JS**: For styling.
- **Tailwind CSS**: For consistent styling.

### 10. Environment Configuration

- **Environment Variables**: Use `process.env.REACT_APP_*` for configuration.

### 11. Security

- **Data Encryption/Decryption**: Using CryptoJS.
- **Sensitive Data**: Proper handling (passwords not logged or stored in plain text).

### 12. Asynchronous Operations

- **Async/Await**: For managing asynchronous code.

### 13. Naming Conventions

- **PascalCase**: For component names and files (e.g., `Login.js`, `Signup.js`).
- **camelCase**: For function names, variables, and utility files (e.g., `Utilities.js`).
- **UPPERCASE**: For constants and action names (e.g., `AUTH_LOGIN`).

### 14. Code Formatting

- **Semicolons**: Consistent use of semicolons.
- **Single Quotes**: For strings.
- **Indentation**: Consistent use of tabs.

### 15. Performance Optimization

- **React.Profiler**: For performance measurement.
- **Memoization**: Recommended for performance improvements.

### 16. Toast Notifications

- **react-toastify**: For displaying notifications.

### 17. Redux Middleware

- **redux-logger**: For debugging in development.
- **extraReducers**: For handling async actions.

### 18. Code Organization

- **Related Functionality**: Group related functionality (e.g., user-related API calls in `UserServices.js`).
- **Separation of Concerns**: Between components and reducers.

### 19. Exports

- **Named Exports**: For utility functions and actions.
- **Default Exports**: For main components and reducers.

### 20. Component Structure

- **Consistent Structure**: For components (e.g., `Login.js`, `Signup.js`).

### 21. State Updates

- **dispatch**: For updating global state (e.g., `AuthActions.setAuth`).

### 22. Conditional Rendering

- **Effective Usage**: (e.g., `isSubmitting` condition in button text).

## Getting Started

To get started with the project:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/project-name.git
   cd project-name
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` File**: Copy `.env.example` to `.env` and configure environment variables.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```