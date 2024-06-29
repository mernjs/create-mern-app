import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import './sentry';
import * as Sentry from '@sentry/react';

if (process.env.REACT_APP_DEBUG === 'false') {
	console.log = function () { };
	console.error = function () { };
	console.warn = function () { };
}

const root = ReactDOM.createRoot(document.getElementById('root'), {
	onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
		console.warn('Uncaught error', error, errorInfo.componentStack);
	}),
	onCaughtError: Sentry.reactErrorHandler(),
	onRecoverableError: Sentry.reactErrorHandler(),
});
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);


