const { z } = require('zod');
const Utilities = require('../Utilities');
const User = require('../models/User');

class AuthController {

	async login(req, res) {
		try {
			const validattionSchema = z.object({
				email: z.string().email(),
				password: z.string(),
			});

			const { email, password } = validattionSchema.parse(req.body);

			const user = await User.findOne({ email }, { email: 1, _id: 1 });
			if (!user) {
				return Utilities.apiResponse(res, 422, 'User Not Registered');
			}

			const isMatch = await user.isValidPassword(password);
			if (!isMatch) {
				return Utilities.apiResponse(res, 422, 'Email or Password not valid');
			}

			const accessToken = await Utilities.signAccessToken(user._doc);
			Utilities.apiResponse(res, 200, 'User Loggedin Successfully!', { ...user._doc, accessToken });

		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}

	async signup(req, res) {
		try {

			const validattionSchema = z.object({
				name: z.string().min(3).max(50),
				email: z.string().email(),
				password: z.string().min(6),
			});

			const { name, email, password } = validattionSchema.parse(req.body);

			const doesExist = await User.findOne({ email }, { _id: 1 });
			if (doesExist) {
				return Utilities.apiResponse(res, 422, 'Email is already registered');
			}

			const user = new User({ name, email, password });
			const savedUser = await user.save();
			const data = {
				_id: savedUser._id,
				name: savedUser.name,
				email: savedUser.email,
			};

			Utilities.apiResponse(res, 200, 'User Created Successfully!', {
				...data,
				accessToken: await Utilities.signAccessToken(data),
			});

		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}

	async validateToken(req, res) {
		try {
			Utilities.apiResponse(res, 200, "Success");
		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}
}

module.exports = new AuthController();
