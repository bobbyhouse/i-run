//
// Routers: runs.js
//
module.exports = function(controllers) {

    var express = require('express');
    var router  = express.Router();

    var controller = controllers.runs;

    router.get('/', function(req, res) {
        res.json(controller.latest());
    });

    return router;
};