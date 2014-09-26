var exec = require('child_process').exec;
var logger = require('./logger');

module.exports.exec = function(debug, platform) {
	// TODO First check if the platform exists, to avoid cordova error:
	// Command failed: No platforms added to this project.
	// Please use `cordova platform add <platform>`.
	logger.info('Emulating platform ' + platform + '...');
	exec('cordova emulate ' + platform, function(error, stdout, stderr) {
		if (stderr) {
			logger.error(stderr);
		} else {
			if (debug) {
				logger.debug(stdout);
			}
		}
	});
};
