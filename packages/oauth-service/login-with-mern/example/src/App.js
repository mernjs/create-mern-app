import './App.css';
import { LoginWithMERN } from 'login-with-mern'

function App() {
    const onSuccess = (profile) => {
        console.log('Login successful, user profile:', profile);
    };

    const onError = (error) => {
        console.log('Login failed:', error);
    };

    return (
        <div>
            <LoginWithMERN
                clientId="c647243379d89594ebf1457fa26fb903"
                clientSecret="edbfdf667ae41d0c9625550f21bd19222cfea0eb3c02cc7a9fdb0452c38a1d68"
                redirectUri="http://localhost:3001/"
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    );
}

export default App;

