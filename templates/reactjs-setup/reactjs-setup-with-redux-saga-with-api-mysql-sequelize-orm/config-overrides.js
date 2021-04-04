const path = require('path');

module.exports = {
    paths: paths => {  
        paths.appIndexJs = path.resolve(__dirname, 'src/engine/index.js');
        return paths;
    }
}