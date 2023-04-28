const Utilities = require('../Utilities');
const User = require('../models/User');
const LinkedInJobsScrapper = require('../libs/LinkedInJobsScrapper')

class AuthController {
	async login(req, res) {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return Utilities.apiResponse(
					res,
					422,
					'User Not Registered',
					[],
				);
			}
			const isMatch = await user.isValidPassword(req.body.password);
			if (!isMatch) {
				return Utilities.apiResponse(
					res,
					422,
					'Email or Password not valid',
					[],
				);
			}
			delete user._doc.password;
			delete user._doc.__v;
			const accessToken = await Utilities.signAccessToken(user._doc);
			Utilities.apiResponse(res, 200, 'User Loggedin Successfully!', {
				...user._doc,
				accessToken,
			});
		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}

	async signup(req, res) {
		try {
			const doesExist = await User.findOne({ email: req.body.email });
			if (doesExist) {
				return Utilities.apiResponse(
					res,
					422,
					'Email is already been registered',
				);
			}
			const user = new User(req.body);
			const savedUser = await user.save();
			const data = {
				_id: savedUser._id,
				name: savedUser.name,
				email: savedUser.email,
			};
			const accessToken = await Utilities.signAccessToken(data);
			Utilities.apiResponse(res, 200, 'User Created Successfully!', {
				...data,
				accessToken,
			});
		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}

	async users(req, res) {
		try {
			const users = await User.find();
			Utilities.apiResponse(res, 200, 'Get Users Successfully', users);
		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}

	async getUserByID(req, res) {
		try {
			const user = await User.findOne({ _id: req.query.user_id });
			Utilities.apiResponse(
				res,
				200,
				'Get User Details Successfully',
				user,
			);
		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}

	async getLinkedInJobs(req, res) {
		try {
			console.log("req.query", req.query)
			const queryOptions = {
				keyword: req.query.keyword || '',
				location: req.query.location || '',
				dateSincePosted: req.query.dateSincePosted || '',
				jobType: req.query.jobType || '',
				remoteFilter: req.query.remoteFilter || '',
				salary: req.query.salary || '',
				experienceLevel: req.query.experienceLevel || '',
				sortBy: req.query.sortBy || '',
				limit: req.query.limit?.toString() || '200',
			};

			LinkedInJobsScrapper.query(queryOptions).then(response => {
				Utilities.apiResponse(
					res,
					200,
					'Get LinkedIn Job Successfully',
					response,
				);
			});
		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}
}

module.exports = new AuthController();
