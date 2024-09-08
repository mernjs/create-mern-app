# login-with-mern

`login-with-mern` is a React component designed to simplify the authentication process in applications. It handles login redirection and token retrieval and provides user profile information upon successful authentication.

## Installation

You can install the package via npm:

```bash
npm install login-with-mern
```

## Usage

Here’s how you can use the `LoginWithMERN` component in your React application:

### Basic Usage

1. **Import the Component**

   ```jsx
   import React from 'react';
   import LoginWithMERN from 'login-with-mern';
   ```

2. **Add the Component to Your App**

   ```jsx
   const App = () => {
       const onSuccess = (userProfile) => {
           console.log('User Profile:', userProfile);
       };

       const onError = (error) => {
           console.error('Authentication Error:', error);
       };

       return (
           <div>
               <h1>My App</h1>
               <LoginWithMERN
                   clientId="YOUR_CLIENT_ID"
                   clientSecret="YOUR_CLIENT_SECRET"
                   redirectUri="YOUR_REDIRECT_URI"
                   onSuccess={onSuccess}
                   onError={onError}
               >
                   Login with MERN
               </LoginWithMERN>
           </div>
       );
   };

   export default App;
   ```

### Props

- **`clientId`** (string): Your client ID for the MERN authentication service.
- **`clientSecret`** (string): Your client secret for the MERN authentication service.
- **`redirectUri`** (string): The URI to redirect to after authentication.
- **`onSuccess`** (function): Callback function that is called with the user profile upon successful authentication.
- **`onError`** (function): Callback function that is called with an error object if authentication fails.
- **`children`** (node): Optional. The content to display inside the button (default is "Login With MERN").

## Example

Here's a simple example of how to use the `LoginWithMERN` component in a React application:

```jsx
import React from 'react';
import LoginWithMERN from 'login-with-mern';

const App = () => {
    const onSuccess = (userProfile) => {
        console.log('User Profile:', userProfile);
    };

    const onError = (error) => {
        console.error('Authentication Error:', error);
    };

    return (
        <div>
            <h1>My Application</h1>
            <LoginWithMERN
                clientId="YOUR_CLIENT_ID"
                clientSecret="YOUR_CLIENT_SECRET"
                redirectUri="YOUR_REDIRECT_URI"
                onSuccess={onSuccess}
                onError={onError}
            >
                Login with MERN
            </LoginWithMERN>
        </div>
    );
};

export default App;
```

## Contributing

If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request on [GitHub](https://github.com/mernjs/create-mern-app/issues).
