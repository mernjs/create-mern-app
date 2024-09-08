const getUserFromToken = require("./getUserFromToken");

module.exports = function auth(req, res, next) {
    const token = req.header("authorization");
    getUserFromToken(token).then(user => {
        req.auth = user;
        next();
    });
};
