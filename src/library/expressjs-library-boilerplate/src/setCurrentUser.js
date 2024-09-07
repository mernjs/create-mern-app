module.exports = function setCurrentUser(req, data, next) {
    req.auth = data
    next()
};
