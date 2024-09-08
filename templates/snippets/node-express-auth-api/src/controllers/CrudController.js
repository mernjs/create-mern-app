const Utilities = require('../Utilities');
const User = require('../models/User');

const transfromData = (data) => {
	let newData = {
		_id: data._id,
		name: data.name,
		email: data.email,
		mobile: data.mobile,
		password: data.password,
	}
	return newData
}
class CrudController {

	async create(req, res) {
		try {
			const doesExist = await User.findOne({ email: req.body.email })
			if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
			const user = new User(req.body)
			const savedUser = await user.save()
			let data = {
				_id: savedUser._id,
				name: savedUser.name,
				email: savedUser.email,
				mobile: savedUser.mobile,
			}
			Utilities.apiResponse(res, 200, 'User Created Successfully!', data)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async read(req, res) {
		try {
			const options = {
				page: req.query?.page || 1,
				limit: req.query?.limit || 10,
				sort: { createdAt: -1 }
			};
			let users = []
			if (req.params.userId) {
				users = await User.findOne({ _id: req.params.userId })
				const data = transfromData(users)
				return Utilities.apiResponse(res, 200, 'Get Users Successfully', data)
			} else {
				users = await User.paginate({}, options)
				let updatedUsers = []
				users.docs.map(user => updatedUsers.push(transfromData(user)))
				const data = {
					users: updatedUsers,
					pagination: {
						"totalDocs": users.totalDocs,
						"limit": users.limit,
						"totalPages": users.totalPages,
						"page": users.page,
					}
				}
				return Utilities.apiResponse(res, 200, 'Get Users Successfully', data)
			}

		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async update(req, res) {
		try {
			// const doesExist = await User.findOne({ email: req.body.email })
			// if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
			await User.findOneAndUpdate({ _id: req.body.user_id }, req.body)
			Utilities.apiResponse(res, 200, 'User Has Been Updated Successfully')
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async delete(req, res) {
		try {
			await User.find({ _id: req.params.userId }).remove().exec();
			Utilities.apiResponse(res, 200, 'User Deleted Successfully')
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}
}

module.exports = new CrudController();