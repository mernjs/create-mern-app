const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

if (process.env.REACT_APP_DEBUG === 'false') {
	Sentry.init({
		dsn: process.env.SANTRY_DSN,
		integrations: [nodeProfilingIntegration()],
		tracesSampleRate: 1.0,
		profilesSampleRate: 1.0,
	});
}