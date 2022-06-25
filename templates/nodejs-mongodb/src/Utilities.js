
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

module.exports.view = (res, file_name, title, message = '', data) => {
    res.render(file_name, {
        data    : data  || [] ,
        title   : title || '',
        message :  message.message || message
    });
}

module.exports.send404 = (req, res) => {
    try {
        apiResponse(res, 404, '404 API Not Found')
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
        if(!apiKey){
            return apiResponse(res, 401, 'No API Key Provided', [])
        }else if(apiKey !== process.env.API_KEY){
            return apiResponse(res, 401, 'Invalid API Key', [])
        }
        next()
    } catch (err) {
       apiResponse(res, 500, err)
    }  
}

module.exports.signAccessToken = (payload) => { 
    try {
        const JWT = require('jsonwebtoken')
        return new Promise((resolve, reject) => {
            const options = {
                expiresIn: '7d',
                issuer: 'pickurpage.com',
                audience: payload._id.valueOf()
            }
            JWT.sign(payload, process.env.JWT_SECRET, options, (error, token) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(token)
            })
        })
    } catch (error) {
        apiResponse(res, 500, err)
    }
}

module.exports.verifyAccessToken = (req, res, next) => {
   try {
        const JWT = require('jsonwebtoken')
        if (!req.headers['authorization'])  return apiResponse(res, 401, 'No Authorization Key Provided', [])
        const token = req.headers['authorization']
        JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return apiResponse(res, 401, 'Invalid Authorization Token', [])
            }
            req.payload = payload
            next()
        })
    } catch (error) {
        apiResponse(res, 500, err)
    }
}

module.exports.apiResponse = apiResponse