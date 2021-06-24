const path = require('path');

module.exports = {
    paths: paths => {  
        paths.appIndexJs = path.resolve(__dirname, 'src/core/index.js');
        return paths;
    }
}