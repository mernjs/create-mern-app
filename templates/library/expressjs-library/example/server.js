const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { auth } = require('../src/index')

app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(auth);
app.use(express.static(path.join(__dirname, './public')));
app.use(require(`./src//routes`));

const server = app
    .listen(process.env.PORT || 8080, () => {
        console.log(
            `********** Server is running on  http://localhost:${server.address().port
            }  **********`,
        );
    })
    .on('error', (error) => {
        console.log(
            '********** \x1b[31mPort ' +
            error.port +
            ' is already in use\x1b[0m **********',
        );
    });
