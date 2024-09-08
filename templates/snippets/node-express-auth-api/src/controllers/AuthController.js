const Utilities = require('../Utilities');
const User = require('../models/User');



const transfromData = (data) => {
	let newData = {
		id: data._id,
		name: data.name,
		email: data.email,
		skills: data.skills,
		gender: data.gender,
		createdAt: data.createdAt,
		designation: data.designation,
		twitter: data.twitter,
		instagram: data.instagram,
		facebook: data.facebook,
		linkedin: data.linkedin,
		description: data.description,
		profilePic: data.profilePic ? `${profileImageBasePath}/${data.profilePic}` : ""
	}
	return newData
}

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

	async getProfileProfile(req, res) {
		try {
			if (!req.payload._id) return Utilities.apiResponse(res, 422, "User id is required.")
			const user = await User.findOne({ _id: req.payload._id })
			const data = transfromData(user)
			Utilities.apiResponse(res, 200, 'Get Users Successfully', data)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async updateProfile(req, res) {
		try {
			const doesExist = await User.findOne({ email: req.body.email })
			if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
			await User.findOneAndUpdate({ _id: req.payload._id }, req.body)
			Utilities.apiResponse(res, 200, 'Profile Has Been Updated Successfully')
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}
}

module.exports = new AuthController();