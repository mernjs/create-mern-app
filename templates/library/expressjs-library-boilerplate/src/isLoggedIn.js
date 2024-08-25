module.exports = function isLoggedIn(req, res, next) {
    if (req.auth) {
        next();
    } else {
        res.status(200).send("Unauthorized");
    }
};