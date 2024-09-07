const Utils = require('../Utils');
const User = require('../models/User');

class AuthController {
	async login(req, res) {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return Utils.apiResponse(res, 422, 'User Not Registered', []);
			}
			const isMatch = await user.isValidPassword(req.body.password);
			if (!isMatch) {
				return Utils.apiResponse(res, 422, 'Email or Password not valid', []);
			}
			delete user._doc.password;
			delete user._doc.__v;
			const accessToken = await Utils.signAccessToken(user._doc);
			Utils.apiResponse(res, 200, 'User Loggedin Successfully!', { ...user._doc, accessToken });
		} catch (error) {
			Utils.apiResponse(res, 500, error);
		}
	}

	async signup(req, res) {
		try {
			const doesExist = await User.findOne({ email: req.body.email });
			if (doesExist) {
				return Utils.apiResponse(res, 422, 'Email is already been registered');
			}
			const user = new User(req.body);
			const savedUser = await user.save();
			const data = {
				_id: savedUser._id,
				name: savedUser.name,
				email: savedUser.email,
			};
			const accessToken = await Utils.signAccessToken(data);
			Utils.apiResponse(res, 200, 'User Created Successfully!', { ...data, accessToken });
		} catch (error) {
			Utils.apiResponse(res, 500, error);
		}
	}

	async users(req, res) {
		try {
			const users = await User.find();
			Utils.apiResponse(res, 200, 'Get Users Successfully', users);
		} catch (error) {
			Utils.apiResponse(res, 500, error);
		}
	}

	async getUserByID(req, res) {
		try {
			const user = await User.findOne({ _id: req.query.user_id });
			Utils.apiResponse(res, 200, 'Get User Details Successfully', user);
		} catch (error) {
			Utils.apiResponse(res, 500, error);
		}
	}
}

module.exports = new AuthController();
