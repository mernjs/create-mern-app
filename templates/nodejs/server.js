require('dotenv').config()
require('./src/database/dbconfig/DB_mongodb_connection');
const Utilities     = require('./src/Utilities')
const bodyParser 	= require('body-parser')
const express 		= require('express')
const logger 		= require('morgan')
const cors 		    = require('cors')
const path          = require('path')

const app 	= express();

app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
app.use(express.static(path.join(__dirname, './public')));

app.use(require(`./src/Routes`));

app.use(logger('dev'));
app.use(Utilities.send404)

let server = app.listen(process.env.PORT || process.env.APP_PORT, () => {
    console.log(`********** Server is running on  http://localhost:${server.address().port}  **********`)
}).on('error', (error) => {
    console.log('********** \x1b[31mPort '+error.port+' is already in use\x1b[0m **********')
})