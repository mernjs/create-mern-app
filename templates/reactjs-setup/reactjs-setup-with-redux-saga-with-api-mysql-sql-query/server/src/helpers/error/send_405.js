module.exports = (req, res, next) => {
    try {
        apiResponse(res, 405, `${req.method} Method not allowed`)
    } catch (err) {
        apiResponse(res, 500, err)
    }  
 }