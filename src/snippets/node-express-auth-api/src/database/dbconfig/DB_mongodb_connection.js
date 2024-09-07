const mongoose = require('mongoose');
const ENV = require('./DB_config');
mongoose.Promise = global.Promise;

mongoose
    .connect(ENV.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('');
        console.log(
            '********** Successfully Connected To The MongoDB **********',
        );
        console.log('');
    })
    .catch((err) => {
        console.log('');
        console.log(
            '********** \x1b[31mMissing DB Connection\x1b[0m ***********',
        );
        console.log('');
    });
