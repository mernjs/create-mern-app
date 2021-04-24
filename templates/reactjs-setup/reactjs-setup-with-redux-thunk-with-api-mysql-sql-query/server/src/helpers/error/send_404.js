module.exports = (req, res) => {
    try {
        let url = req.originalUrl
        if(url.indexOf('/api/v1') !== -1 ){
            apiResponse(res, 404, '404 API Not Found')
        }else{
            res.render('pages/Page404', {data: [], title: '404 Page'})
        }
    } catch (error) {
        apiResponse(res, 500, 'Internal Server Error')
    }  
}   