
export  const apiResponse = (res: any, status: any, message: any = '', data: any) => {
    let new_message = ''
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
        status,
        message : new_message
    });
}

export  const view = (res: any, file_name: any, title: any, message: any = '', data: any) => {
    res.render(file_name, {
        data    : data  || [] ,
        title   : title || '',
        message :  message.message || message
    });
}

export  const send404 = (req: any, res: any) => {
    try {
        const url = req.originalUrl
        if(url.indexOf('/api/v1') !== -1 ){
            apiResponse(res, 404, '404 API Not Found', [])
        }else{
            res.render('pages/Page404', {data: [], title: '404 Page'})
        }
    } catch (error) {
        apiResponse(res, 500, 'Internal Server Error', [])
    }
}

export  const send405 = (req: any, res: any, next: any) => {
    try {
        apiResponse(res, 405, `${req.method} Method not allowed`, [])
     } catch (err) {
        apiResponse(res, 500, err, [])
     }
 }

 export  const apiKeyValidate = (req: any, res: any, next: any) => {
    try {
        const apiKey = req.headers.apikey
        const secretkey = req.headers.secretkey
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
       apiResponse(res, 500, err, [])
    }
}
