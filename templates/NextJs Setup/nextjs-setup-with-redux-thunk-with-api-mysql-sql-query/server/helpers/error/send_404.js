module.exports = (req, res) => {
    try {
        apiResponse(res, 404, '404 API Not Found')
    } catch (error) {
        apiResponse(res, 500, 'Internal Server Error')
    }  
}   