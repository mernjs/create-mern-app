document.getElementById('loginBtn').addEventListener('click', () => {
    const clientId = 'acb324368c3b87a19f811616dcdf2271';
    const clientSecret = 'dc22541275fc33916b935cd9437f100ad06a9ea29d5dc771a463a6ad3786f71e';
    const redirectUri = 'http://localhost:3000/developer/dashboard';
    const authUrl = `http://localhost:3000/auth/authorize?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`;
    
    window.location.href = authUrl;
});

// Simulate a callback route after user is authenticated
function getAccessTokenFromCode(authCode) {
    fetch('http://localhost:3000/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: authCode,
            client_id: 'acb324368c3b87a19f811616dcdf2271',
            client_secret: 'dc22541275fc33916b935cd9437f100ad06a9ea29d5dc771a463a6ad3786f71e',
            redirect_uri: 'http://localhost:3000/developer/dashboard'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Access Token:', data.access_token);
        // Use the access token to make authenticated requests
        fetch('http://localhost:3000/user/profile', {
            headers: {
                'Authorization': `Bearer ${data.access_token}`
            }
        })
        .then(response => response.json())
        .then(profile => {
            console.log('User Profile:', profile);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Simulate getting the authorization code from the URL
const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get('code');
if (authCode) {
    getAccessTokenFromCode(authCode);
}
