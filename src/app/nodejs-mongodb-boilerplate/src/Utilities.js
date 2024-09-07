const { rateLimit } = require('express-rate-limit')
const { z } = require('zod');
const CryptoJS = require('crypto-js');
const Sentry = require("@sentry/node");

if (process.env.APP_DEBUG === 'false') {
	console.log = function () { };
	console.error = function () { };
	console.warn = function () { };
}

const formatZodErrors = (errors) => {
	const formattedErrors = {};
	errors.forEach(err => {
		const field = err.path.join('.');
		formattedErrors[field] = err.message;
	});
	return formattedErrors;
};

const apiResponse = (res, status, message, data) => {
	let newMessage = '';
	let responseData = data || null;

	if (message instanceof z.ZodError) {
		responseData = encrypt(formatZodErrors(message.errors));
		newMessage = 'Validation Error';
		status = 422;
	} else if (process.env.APP_DEBUG === 'true') {
		newMessage = message?.message || message;
	} else {
		newMessage = message.message ? 'Something went wrong, please try again later' : message;
		responseData = responseData ? encrypt(responseData) : [];
		if (message?.message) Sentry.captureException(message);
	}

	res.status(status).send({ data: responseData || [], status: status, message: newMessage });
};

const encrypt = (data) => {
	try {
		if (!data || process.env.APP_DEBUG === 'true') return data;
		return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_SECRET_KEY).toString();
	} catch (error) {
		console.log(error);
	}
};

const decrypt = (body) => {
	try {
		if (!body || process.env.APP_DEBUG === 'true') return body;
		const bytes = CryptoJS.AES.decrypt(body.payload, process.env.ENCRYPTION_SECRET_KEY);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	} catch (error) {
		console.log(error);
	}
};

module.exports.decryptRequestBody = (req, res, next) => {
	try {
		req.body = decrypt(req.body);
		next();
	} catch (error) {
		apiResponse(res, 400, error);
	}
};

module.exports.apiKeyValidate = (req, res, next) => {
	try {
		const apiKey = req.headers.apikey;
		if (!apiKey) {
			return apiResponse(res, 401, 'No API Key Provided');
		} else if (apiKey !== process.env.API_KEY) {
			return apiResponse(res, 401, 'Invalid API Key');
		}
		next();
	} catch (err) {
		return apiResponse(res, 500, err);
	}
};

module.exports.signAccessToken = (payload) => {
	try {
		const JWT = require('jsonwebtoken');
		return new Promise((resolve, reject) => {
			const options = {
				expiresIn: process.env.JWT_EXPIRATION,
				issuer: process.env.JWT_ISSUER,
				audience: payload._id.valueOf(),
			};
			JWT.sign(payload, process.env.JWT_SECRET, options, (error, token) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(token);
			}
			);
		});
	} catch (error) {
		return apiResponse(res, 500, error);
	}
};

module.exports.verifyAccessToken = (req, res, next) => {
	try {
		const JWT = require('jsonwebtoken');
		if (!req.headers['authorization']) return apiResponse(res, 401, 'No Authorization Key Provided');
		const token = req.headers['authorization'];
		JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
			if (err) return apiResponse(res, 401, 'Invalid Authorization Token');
			req.payload = payload;
			next();
		});
	} catch (error) {
		return apiResponse(res, 500, error);
	}
};

module.exports.setRateLimit = rateLimit({
	windowMs: process.env.RATE_LIMIT_TIME_MS,
	limit: process.env.RATE_LIMIT_COUNT,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	message: async (req, res) => apiResponse(res, 429, 'API Rate Limit Exceeded'),
})

const allowedOrigin = (origin, callback) => {
	const allowedDomains = process.env.CORS_ORIGINS.split(',');
	const isOriginAllowed = allowedDomains.some(domain => origin && origin.includes(domain));
	if (!origin || isOriginAllowed) {
		callback(null, true);
	} else {
		const error = new Error('Not allowed by CORS');
		callback(error);
	}
}

module.exports.corsOriginOptions = {
	origin: allowedOrigin,
	methods: process.env.CORS_METHODS,
	credentials: process.env.CORS_CREDENTIALS === 'true' ? true : false,
	optionsSuccessStatus: process.env.CORS_OPTION_STATUS
};

module.exports.corsError = (err, req, res, next) => {
	if (err && err.status === 403) {
		apiResponse(res, 403, 'Not allowed by CORS');
	} else {
		next(err);
	}
}



module.exports.apiResponse = apiResponse;