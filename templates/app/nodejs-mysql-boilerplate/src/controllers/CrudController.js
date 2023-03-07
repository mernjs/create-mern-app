const Utilities = require('../Utilities')
const { User } = require('../models');

class CrudController {

    async create(req, res) {
        try {
            const doesExist = await User.findOne({ where: { email: req.body.email } })
            if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
            const savedUser = new User(req.body)
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
            const doesExist = await User.findOne({ where: { email: req.body.email } })
            if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
            await User.update(req.body, { where: { email: req.body.email } })
            Utilities.apiResponse(res, 200, 'User Has Been Updated Successfully')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async delete(req, res) {
        try {
            await User.destroy({ where: { email: req.body.email } });
            Utilities.apiResponse(res, 200, 'User Deleted Successfully')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }
}

module.exports = new CrudController();