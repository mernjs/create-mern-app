# @create-mern-app/auth-service

`@create-mern-app/auth-service` is a JavaScript package designed to simplify the process of interacting with OAuth2.0 authentication flows. It provides methods for obtaining authorization tokens, refreshing tokens, and retrieving user profiles from an OAuth2.0 server.

## Installation

To install `@create-mern-app/auth-service`, run:

```bash
npm install @create-mern-app/auth-service
```

## Usage

### 1. Import the Package

In your JavaScript file, import the `AuthService` class:

```javascript
import AuthService from '@create-mern-app/auth-service';
```

### 2. Initialize AuthService

Create an instance of `AuthService` with your OAuth2.0 client credentials and server base URL:

```javascript
const authService = new AuthService({
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    redirectUri: 'your_redirect_uri',
    authBaseUrl: 'http://localhost:3000' // Optional: Default is 'http://localhost:3000'
});
```

### 3. Generate Authorization URL

Generate the URL to which users should be redirected for authorization:

```javascript
const authUrl = authService.getAuthUrl();
console.log('Authorization URL:', authUrl);
```

### 4. Obtain Access Token

After the user authorizes your application and you receive an authorization code, exchange it for an access token:

```javascript
const authCode = 'received_auth_code';
authService.getAccessToken(authCode)
    .then(data => {
        console.log('Access Token:', data.accessToken);
        console.log('Refresh Token:', data.refreshToken);
    })
    .catch(error => {
        console.error('Error fetching access token:', error);
    });
```

### 5. Refresh Access Token

Use a refresh token to obtain a new access token:

```javascript
const refreshToken = 'your_refresh_token';
authService.getRefreshToken(refreshToken)
    .then(data => {
        console.log('New Access Token:', data.accessToken);
        console.log('New Refresh Token:', data.refreshToken); // Optional: Check if a new refresh token is issued
    })
    .catch(error => {
        console.error('Error refreshing access token:', error);
    });
```

### 6. Retrieve User Profile

Use the access token to fetch the user’s profile information:

```javascript
const accessToken = 'your_access_token';
authService.getUserProfile(accessToken)
    .then(profile => {
        console.log('User Profile:', profile);
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });
```

## Methods

### `constructor({ clientId, clientSecret, redirectUri, authBaseUrl })`

Creates an instance of `AuthService`.

- `clientId` (string): Your OAuth2.0 client ID.
- `clientSecret` (string): Your OAuth2.0 client secret.
- `redirectUri` (string): The URI to which users are redirected after authentication.
- `authBaseUrl` (string, optional): Base URL of your authentication server. Defaults to `'http://localhost:3000'`.

### `getAuthUrl()`

Generates the authorization URL for user authentication.

### `getAccessToken(authCode)`

Exchanges an authorization code for an access token.

- `authCode` (string): The authorization code received after user authentication.

Returns an object containing:
- `accessToken` (string): The access token.
- `refreshToken` (string, optional): The refresh token, if provided.

### `getRefreshToken(refreshToken)`

Exchanges a refresh token for a new access token.

- `refreshToken` (string): The refresh token obtained previously.

Returns an object containing:
- `accessToken` (string): The new access token.
- `refreshToken` (string, optional): The new refresh token, if provided.

### `getUserProfile(accessToken)`

Retrieves the user profile using the access token.

- `accessToken` (string): The access token obtained from the OAuth2.0 server.

## Error Handling

- Throws errors if fetching the access token, refreshing the token, or retrieving the user profile fails. Ensure proper error handling in your application.

## Example

Here is a complete example showing how to use `@create-mern-app/auth-service`:

```javascript
import AuthService from '@create-mern-app/auth-service';

const authService = new AuthService({
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    redirectUri: 'http://localhost:5500/callback'
});

const authUrl = authService.getAuthUrl();
console.log('Authorize URL:', authUrl);

// After redirect and obtaining the auth code
const authCode = 'received_auth_code';

authService.getAccessToken(authCode)
    .then(data => {
        console.log('Access Token:', data.accessToken);
        console.log('Refresh Token:', data.refreshToken);
        
        // Optionally, refresh the access token
        return authService.getRefreshToken(data.refreshToken);
    })
    .then(data => {
        console.log('New Access Token:', data.accessToken);
        console.log('New Refresh Token:', data.refreshToken);
        
        // Retrieve user profile
        return authService.getUserProfile(data.accessToken);
    })
    .then(profile => {
        console.log('User Profile:', profile);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## Contributing

Feel free to contribute by forking the repository and submitting a pull request. Please ensure to follow the coding guidelines and include tests for new features.