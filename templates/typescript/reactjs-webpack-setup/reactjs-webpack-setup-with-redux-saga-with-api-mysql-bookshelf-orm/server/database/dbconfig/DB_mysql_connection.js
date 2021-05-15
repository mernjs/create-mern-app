const mysql = require('mysql')

var db = mysql.createConnection({
    host     : process.env.DB_HOST, 
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    port     : process.env.DB_PORT
});
  
db.connect(err => {
    if (err) {
        console.log('')
        console.log('********** \x1b[31mMissing DB Connection\x1b[0m ***********')
        console.log('')
        return;
    }
    console.log('')
    console.log("********** Successfully Connected To The MySQL **********"); 
    console.log('')
})
 
module.exports = db