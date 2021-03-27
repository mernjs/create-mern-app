module.exports = (req, res, next) => {
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