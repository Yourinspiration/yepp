var exec = require('child_process').exec;
var config = require('./config');
var logger = require('./logger');

module.exports.exec = function(debug) {
	var plugins = config.plugins();
	// Add all plugins found in yepp.json
	for (var i = 0; i < plugins.length; i++) {
		add_plugin(debug, plugins[i]);
	}
};

function add_plugin(debug, plugin) {
	exec('cordova plugin add ' + plugin, function(error, stdout, stderr) {
		if (error) {
			logger.error(stderr);
		} else {
			if (debug) {
				logger.debug(stdout);
			}
			logger.info('Adding plugin ' + plugin);
		}
	});
}
