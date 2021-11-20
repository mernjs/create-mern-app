const nodemailer    = require('nodemailer');

module.exports = (data) => {
    try {
        return new Promise(function(resolve, reject) {
            let mailTransporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD 
                }
            })
              
            let mailDetails = {
                from: `MernJs Community ${process.env.MAIL_FROM_ID}`,
                to: data.email_ids,
                subject: data.subject,
                html:   data.html,
            };
              
            mailTransporter.sendMail(mailDetails, function(error, data) {
                if(error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            })
        });

        
    } catch (err) {
       apiResponse(res, 500, err)
    }  
}