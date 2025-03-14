const fs = require('fs')
const path = require('path')

const apiResponse = (res, status, message, data) => {
	let newMessage = '';
	if (process.env.APP_DEBUG === 'true') {
		newMessage = message?.message || message;
	} else {
		if (message.message) {
			newMessage = 'somthing went wroung please try again later';
		} else {
			newMessage = message;
		}
	}
	res.status(status).send({
		data: data || [],
		status: status,
		message: newMessage,
	});
};

module.exports.view = (res, fileName, title, message, data) => {
	res.render(fileName, {
		data: data || [],
		title: title || '',
		message: message?.message || message,
	});
};

module.exports.send404 = (req, res) => {
	try {
		apiResponse(res, 404, '404 API Not Found');
	} catch (error) {
		apiResponse(res, 500, 'Internal Server Error');
	}
};

module.exports.send405 = (req, res, next) => {
	try {
		apiResponse(res, 405, `${req.method} Method not allowed`);
	} catch (err) {
		apiResponse(res, 500, err);
	}
};

module.exports.apiKeyValidate = (req, res, next) => {
	try {
		const apiKey = req.headers.apikey;
		if (!apiKey) {
			return apiResponse(res, 401, 'No API Key Provided', []);
		} else if (apiKey !== process.env.API_KEY) {
			return apiResponse(res, 401, 'Invalid API Key', []);
		}
		next();
	} catch (err) {
		apiResponse(res, 500, err);
	}
};

module.exports.signAccessToken = (payload) => {
	try {
		console.log('payload', payload);
		const JWT = require('jsonwebtoken');
		return new Promise((resolve, reject) => {
			const options = {
				expiresIn: '7d',
				issuer: 'pickurpage.com',
				audience: payload._id.valueOf(),
			};
			JWT.sign(
				payload,
				process.env.JWT_SECRET,
				options,
				(error, token) => {
					if (error) {
						reject(error);
						return;
					}
					resolve(token);
				},
			);
		});
	} catch (error) {
		apiResponse(res, 500, err);
	}
};

module.exports.verifyAccessToken = (req, res, next) => {
	try {
		const JWT = require('jsonwebtoken');
		if (!req.headers['authorization']) {
			return apiResponse(res, 401, 'No Authorization Key Provided', []);
		}
		const token = req.headers['authorization'];
		JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
			if (err) {
				return apiResponse(res, 401, 'Invalid Authorization Token', []);
			}
			req.payload = payload;
			next();
		});
	} catch (error) {
		apiResponse(res, 500, err);
	}
};


function getImageExtension(base64Data) {
	const dataUrlRegex = /^data:image\/(\w+);base64,/;
	const match = base64Data.match(dataUrlRegex);
	if (match && match[1]) {
		return match[1];
	}
	return null;
}

module.exports.uploadImage = async (base64image, folder) => {

	return new Promise((resolve, reject) => {
		var matches = base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
			response = {};
		if (matches.length !== 3) {
			reject('Invalid input string')
			return;
		}
		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');
		let decodedImg = response;
		let imageBuffer = decodedImg.data;
		let fileName = `gallery_${Math.floor(Date.now() / 1000)}.${getImageExtension(base64image)}`;
		try {
			const folderPath = path.resolve("public", folder, fileName);
			fs.writeFileSync(folderPath, imageBuffer, 'utf8');
			resolve(fileName)
		} catch (e) {
			reject(e);
		}
	})

}

module.exports.apiResponse = apiResponse;
