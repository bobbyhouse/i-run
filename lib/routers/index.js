//
// Routers: index.js
// Description: Export routers contained within the current directory.
//
module.exports = (function(controllers) {
  
    var _    = require('underscore');
    var fs   = require('fs');
    var path = require('path');

    var exports = {};

    var routers = _.without(fs.readdirSync(__dirname), 'index.js');

    _.map(routers, function (file) {
        var router = path.basename(file, path.extname(file));
        exports[router] = require('./' + router)(controllers);
    });

    return exports;
});