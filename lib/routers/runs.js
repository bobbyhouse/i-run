//
// Routers: runs.js
//
module.exports = function(controllers) {

    var express = require('express');
    var router  = express.Router();

    var controller = controllers.runs;

    router.get('/', function(req, res) {

        var latest = controller.latest(function(run) {
            res.json(run);
        });
    });

    return router;
};