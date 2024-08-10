import React, { useEffect } from 'react';
import AuthService from '@create-mern-app/auth-service';

const LoginWithMERN = ({
    clientId,
    clientSecret,
    redirectUri,
    onSuccess,
    onError,
    children
}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    const authService = new AuthService({ clientId, clientSecret, redirectUri });
    useEffect(() => {
        if (!authCode) return;
        const fetchProfile = async () => {
            try {
                const tokenResponse = await authService.getAccessToken(authCode);
                const userProfile = await authService.getUserProfile(tokenResponse.accessToken);
                onSuccess(userProfile);
            } catch (error) {
                onError(error);
            }
        };
        fetchProfile();
    }, [authService, onSuccess, onError, authCode]);

    const handleLogin = () => {
        try {
            const authUrl = authService.getAuthUrl();
            window.location.href = authUrl;
        } catch (error) {
            onError(error);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>
                {children || 'Login With MERN'}
            </button>
        </div>
    );
};

export default LoginWithMERN;