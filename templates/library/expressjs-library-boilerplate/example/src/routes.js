const express = require('express');
const Route = express.Router();

Route.route('/').get((req, res, next) => {
    console.log("Auth Details ==>>>", req.auth)
    res.status(200).send({
        message: 'success'
    })
})

module.exports = Route;