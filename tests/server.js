var express = require('express');
var app = express();

/**
 * Standard endpoint that serves one app
 */
app.use('/singleAppTest', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.end('F2_jsonpCallback_com_test_single(' + JSON.stringify({
		apps: [
			{ html: '<div></div>' }
		]
	}) + ')');
});

/**
	* Provide an endpoint for making batch requests
	*/
app.use('/batchRequestTest', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.end('F2_jsonpCallback_com_test_batchable(' + JSON.stringify({
		apps: [
			{ html: '<div></div>' },
			{ html: '<div></div>' }
		]
	}) + ')');
});

// export the module for use with grunt
module.exports = app;