const moment = require('moment')

module.exports = (res, file_name, title, message = '', data) => {
    res.render(file_name, {
        data    : data  || [] ,
        title   : title || '',
        message : message.message || message,
        moment 	: moment,
        JSON 	: JSON 	
    });
}