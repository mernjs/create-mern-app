module.exports = (res, status, message = '', data) => {
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