
const apiResponse = (res, status, message = '', data) => {
    var new_message = ''
    if(process.env.APP_DEBUG === "true"){
        new_message =  message.message || message
    }else{
        if(message.message){
            new_message = 'somthing went wroung please try again later'
        }else{
            new_message = message
        }
    }
    res.status(status).send({
        data    : data  || [],
        status  : status,
        message : new_message
    });
}

module.exports.send404 = (req, res) => {
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

module.exports.send405 = (req, res, next) => {
    try {
        apiResponse(res, 405, `${req.method} Method not allowed`)
     } catch (err) {
        apiResponse(res, 500, err)
     }  
 }

module.exports.apiKeyValidate = (req, res, next) => {
    try {
        let apiKey = req.headers.apikey
        let secretkey = req.headers.secretkey
        if(!apiKey){
            return apiResponse(res, 401, 'No API Key Provided', [])
        }else if(apiKey !== process.env.API_KEY){
            return apiResponse(res, 401, 'Invalid API Key', [])
        }
        if(!secretkey){
            return apiResponse(res, 401, 'No API Secret Key Provided', [])
        }else if(secretkey !== process.env.API_SECRET){
            return apiResponse(res, 401, 'Invalid API Secret Key', [])
        }
        next()
    } catch (err) {
       apiResponse(res, 500, err)
    }  
}

module.exports.apiResponse = apiResponse