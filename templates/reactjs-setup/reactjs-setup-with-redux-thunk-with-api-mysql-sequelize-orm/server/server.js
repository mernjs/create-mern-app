const bodyParser 	= require('body-parser')
const express 		= require('express')
const logger 		= require('morgan')
const cors 		    = require('cors')
require('./src/helpers')

const app 	= express();

app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
app.use(express.static(path.join(__dirname, './public')));

fs.readdirSync(path.join(__dirname, `./src/routes`)).forEach(function(file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        let name = file.replace('.js', '');
        app.use(require(`./src/routes/${name}`));
    }
});

app.use(logger('dev'));

const isProduction = process.env.NODE_ENV === 'production';
if(isProduction){
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
    })
}else{
    app.get('/', (req, res) => {
        return apiResponse(res, 200, 'Welcome')
    })
} 

let server = app.listen(process.env.PORT || process.env.APP_PORT, () => {
    console.log(" ");
    console.log(`********** Server is running on  http://localhost:${server.address().port}  **********`)
    console.log(" ");
}).on('error', (error) => {
    console.log(" ");
    console.log('********** \x1b[31mPort '+error.port+' is already in use\x1b[0m **********')
    console.log(" ");
})