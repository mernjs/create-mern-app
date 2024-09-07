import AuthService from '@create-mern-app/auth-service';

const authService = new AuthService({
    clientId: 'c647243379d89594ebf1457fa26fb903',
    clientSecret: 'edbfdf667ae41d0c9625550f21bd19222cfea0eb3c02cc7a9fdb0452c38a1d68',
    redirectUri: 'http://localhost:3001/'
});

export default authService;
