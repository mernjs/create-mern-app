const express = require('express');
const Route = express.Router();
const { randomStr } = require('../../src/index')

Route.route('/').get((req, res) => {
    res.status(200).send({
        message: randomStr(50)
    })
})

module.exports = Route;