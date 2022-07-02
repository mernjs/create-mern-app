const bcrypt = require('bcrypt')
const Utilities = require('../Utilities')
const { User } = require('../models')

class AuthController {

    async login(req, res){
        try {
            let user = await User.findOne({where: { email: req.body.email }})
            user = user.toJSON()
            if (!user) return Utilities.apiResponse(res, 422, 'User Not Registered', [])
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) return Utilities.apiResponse(res, 422, 'Email or Password not valid', [])
            delete user.password
            const accessToken = await Utilities.signAccessToken(user)
           return Utilities.apiResponse(res, 200, 'User Loggedin Successfully!', {...user, accessToken})
        } catch (error) {
            res.send(error.message)
            return Utilities.apiResponse(res, 500, error)
        }
    }

    async signup(req, res){
        try {
            const doesExist = await User.findOne({where: { email: req.body.email }})
            if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            let savedUser = await User.create({...req.body, password: hashedPassword})
            savedUser = savedUser.toJSON()
            delete savedUser.password
            const accessToken = await Utilities.signAccessToken(savedUser)
            return Utilities.apiResponse(res, 200, 'User Created Successfully!', {...savedUser, accessToken})
        } catch (error) {
            res.send(error.message)
            Utilities.apiResponse(res, 500, error)
        }
    }

    async users(req, res){
        try {
            const users = await User.findAll()
            Utilities.apiResponse(res, 200, 'Get Users Successfully', users)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async getUserByID(req, res){
        try {
            const user = await User.findOne({where: {id: req.query.user_id}})
            Utilities.apiResponse(res, 200, 'Get User Details Successfully', user)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

}

module.exports = new AuthController();