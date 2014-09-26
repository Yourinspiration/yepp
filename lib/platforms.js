var exec = require('child_process').exec;
var fs = require('fs');
var config = require('./config');
var logger = require('./logger');

var yeppConfigPath = process.cwd() + '/yepp.json';
var platformsPath = process.cwd() + '/platforms';
var pluginsPath = process.cwd() + '/plugins';

module.exports.exec = function(debug) {
	check_if_required_dirs_exist();
	add_all_platforms(debug);
};

function check_if_required_dirs_exist() {
	if (!fs.existsSync(platformsPath)) {
		fs.mkdirSync(platformsPath);
	}
	if (!fs.existsSync(pluginsPath)) {
		fs.mkdirSync(pluginsPath);
	}
}

function add_all_platforms(debug) {
	var platforms = config.platforms();
	for (var i = 0; i < platforms.length; i++) {
		add_platform(debug, platforms[i]);
	}
}

function add_platform(debug, platform) {
	logger.info('Adding platform ' + platform + '...');
	exec('cordova platform add ' + platform, function(error, stdout, stderr) {
		if (stderr) {
			logger.error(stderr);
		} else {
			if (debug) {
				logger.debug(stdout);
			}
		}
	});
}
