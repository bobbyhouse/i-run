//
// Controllers: index.js
// Description: Export controllers contained within the current directory.
//
module.exports = (function(controllers) {
  
    var _    = require('underscore');
    var fs   = require('fs');
    var path = require('path');

    var exports = {};

    var controllers = _.without(fs.readdirSync(__dirname), 'index.js');

    _.map(controllers, function (file) {
        var controller = path.basename(file, path.extname(file));
        exports[controller] = require('./' + controller)();
    });

    return exports;
});