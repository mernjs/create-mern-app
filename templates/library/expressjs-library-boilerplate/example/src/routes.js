const express = require('express');
const Router = express.Router();

Router.route('/').get(async (req, res, next) => {
    console.log("Auth Details ==>>>", req.auth)
    res.status(200).send({
        message: 'success'
    })
})

module.exports = Router;