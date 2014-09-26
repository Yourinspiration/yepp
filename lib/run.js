var exec = require('child_process').exec;
var fs = require('fs');
var icons = require('./icons');
var logger = require('./logger');

module.exports.exec = function(debug, platform) {
	icons.copyIcons(debug, platform);
	logger.info('Running platform ' + platform + '...');
	exec('cordova run ' + platform, function(error, stdout, stderr) {
		if (stderr) {
			logger.error(stderr);
		} else {
			if (debug) {
				logger.debug(stdout);
			}
		}
	});
};
