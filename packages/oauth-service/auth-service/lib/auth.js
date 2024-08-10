// lib/auth.js

class AuthService {
    constructor({ clientId, clientSecret, redirectUri, authBaseUrl }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.authBaseUrl = authBaseUrl || 'http://localhost:3000';
    }

    // Generate the authorization URL
    getAuthUrl() {
        return `${this.authBaseUrl}/auth/authorize?client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUri}`;
    }

    // Exchange authorization code for access token and optionally refresh token
    async getAccessToken(authCode) {
        const response = await fetch(`${this.authBaseUrl}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: authCode,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token, // Assume the server returns a refresh token
            expiresIn: data.expires_in
        };
    }

    // Retrieve a new access token using the refresh token
    async getRefreshToken(refreshToken) {
        const response = await fetch(`${this.authBaseUrl}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
                client_id: this.clientId,
                client_secret: this.clientSecret
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch new access token');
        }

        const data = await response.json();
        return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token, // Assume the server might return a new refresh token
            expiresIn: data.expires_in
        };
    }

    // Retrieve the user profile using the access token
    async getUserProfile(accessToken) {
        const response = await fetch(`${this.authBaseUrl}/user/profile`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        return await response.json();
    }
}

export default AuthService;
