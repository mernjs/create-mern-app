const Utilities = require('../Utilities');
const User = require('../models/User');

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
                email: savedUser.email
            }
            Utilities.apiResponse(res, 200, 'User Created Successfully!', data)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async read(req, res) {
        try {
            const users = await User.find()
            Utilities.apiResponse(res, 200, 'Get Users Successfully', users)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async update(req, res) {
        try {
            const doesExist = await User.findOne({ email: req.body.email })
            if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
            await User.findOneAndUpdate({ _id: req.params.user_id }, req.body)
            Utilities.apiResponse(res, 200, 'User Has Been Updated Successfully')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async delete(req, res) {
        try {
            await User.find({ _id: req.params.user_id }).remove().exec();
            Utilities.apiResponse(res, 200, 'User Deleted Successfully')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }
}

module.exports = new CrudController();