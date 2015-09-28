module.exports = (function(port) {

	var express = require('express');
	var app     = express();

	app.get('/status', function(req, res) {
		res.sendStatus(200);
	});

    var controllers = require('./lib/controllers')();

    var routers = require('./lib/routers')(controllers);

    app.use('/runs', routers.runs);

	app.listen(port);
	console.log('server is listening on port: ' + port);

	return app;

})(process.env.PORT);