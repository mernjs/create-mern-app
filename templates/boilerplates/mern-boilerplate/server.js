require('dotenv').config()
require('./api/database/dbconfig/DB_mongodb_connection');
const bodyParser 	= require('body-parser')
const express 		= require('express')
const cors 		    = require('cors')
const next          = require("next");
const path          = require('path')
const dev           = process.env.NODE_ENV !== "production";
const nextApp       = next({ dev });
const handle        = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app 	= express();

    app.use(cors())
    app.use(bodyParser.json({limit: '10mb', extended: true}))
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
    
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, './api/views'));
    app.use(express.static(path.join(__dirname, './public')));

    app.use(require(`./api/App`));
    app.disable('x-powered-by');
    
    app.get("*", (req, res) => {
        return handle(req, res);
    })

    let server = app.listen(process.env.PORT || process.env.APP_PORT, () => {
        console.log(`********** Server is running on  http://localhost:${server.address().port}  **********`)
    }).on('error', (error) => {
        console.log('********** \x1b[31mPort '+error.port+' is already in use\x1b[0m **********')
    })
    
}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
})