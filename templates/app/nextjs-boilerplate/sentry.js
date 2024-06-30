const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

if (process.env.REACT_APP_DEBUG === 'false') {
	Sentry.init({
		dsn: "https://44efa001e0bcc0b3487f7f6fbb4c998e@o4507511705960448.ingest.us.sentry.io/4507511707664384",
		integrations: [
			nodeProfilingIntegration(),
		],
		tracesSampleRate: 1.0,
		profilesSampleRate: 1.0,
	});
}