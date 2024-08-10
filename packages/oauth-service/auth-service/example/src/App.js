import React, { useEffect, useState } from 'react';
import authService from './authServiceSingleton';

function App() {
    const [profile, setProfile] = useState(null)
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    useEffect(() => {
        if (!authCode) return;
        authService.getAccessToken(authCode)
            .then(res => {
                console.log('Access Token:', res);
                return authService.getUserProfile(res.accessToken);
            })
            .then(profile => {
                setProfile(profile)
                console.log('User Profile:', profile);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [authCode]);

    const onLogin = () => {
        try {
            const authUrl = authService.getAuthUrl();
            console.log('Authorize URL:', authUrl);
            window.location.href = authUrl;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="App">
            {!profile ?
                <button onClick={onLogin}>Login With MERN</button>
                :
                <p>{profile.email}</p>
            }

        </div>
    );
}

export default App;
