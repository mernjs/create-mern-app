const mongoose = require('mongoose');
const ENV = require('./DBConfig');
mongoose.Promise = global.Promise;

mongoose.connect(ENV.MONGO_URI).then(() => {
    console.log('********** Successfully Connected To The MongoDB **********');
}).catch((err) => {
    console.error('********** Missing DB Connection ***********');
});
