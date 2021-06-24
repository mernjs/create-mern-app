import './database/dbconfig/DB_mysql_connection';
import * as Helpers from './helpers/Helpers'
import bodyParser 	from 'body-parser'
import express 		from 'express'
import logger 		from 'morgan'
import cors 		from 'cors'
import path         from 'path'
import fs           from 'fs'
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

fs.readdirSync(path.join(__dirname, `routes`)).forEach(async (file) => {
    if (file.match(/\.ts$/) !== null && file !== 'index.ts') {
        let name = file.replace('.ts', '');
        let routes = await import(`./routes/${name}`);
        app.use(routes.default);
    }
});

app.use(logger('dev'));
// app.use(Helpers.send404)

let PORT = process.env.PORT || process.env.APP_PORT

app.listen(PORT, () => {
    console.log(" ");
    console.log(`********** Server is running on  http://localhost:${PORT}  **********`)
    console.log(" ");
}).on('error', (error) => {
    console.log(" ");
    console.log('********** \x1b[31m'+error+'\x1b[0m **********')
    console.log(" ");
})