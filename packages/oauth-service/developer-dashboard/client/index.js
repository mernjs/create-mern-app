// app.js
const AuthService = require('./lib/auth');

const authService = new AuthService({
    clientId: 'acb324368c3b87a19f811616dcdf2271',
    clientSecret: 'dc22541275fc33916b935cd9437f100ad06a9ea29d5dc771a463a6ad3786f71e',
    redirectUri: 'http://localhost:5500/client/',
});
 mnbvcx
document.getElementById('loginBtn').addEventListener('click', () => {
    window.location.href = authService.getAuthUrl();
});

// Simulate getting the authorization code from the URL
const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get('code');
if (authCode) {
    authService.getAccessToken(authCode)
        .then(accessToken => authService.getUserProfile(accessToken))
        .then(profile => {
            document.getElementById('userEmail').innerText = `Email: ${profile.email}`;
            document.getElementById('userEmail').style.display = 'block';
            document.getElementById('loginBtn').style.display = 'none';
        })
        .catch(error => console.error('Error:', error));
}
