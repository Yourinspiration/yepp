var exec = require('child_process').exec;
var fs = require('fs');
var logger = require('./logger');
var icons = require('./icons');
var config = require('./config');

module.exports.exec = function(debug, platform) {
	check_if_required_dirs_exist();
	add_platform_to_yepp_config(debug, platform);
	add_requested_plaform(debug, platform);
	install_requested_platform(debug, platform);
	icons.copyIcons(debug, platform);
};

function checkIfRequiredDirsExist() {
	// the platforms and plugins directory is mandatory
	// for cordova to execute install/build/run
	if (!fs.existsSync(process.cwd() + '/platforms')) {
		fs.mkdirSync(process.cwd() + '/platforms');
	}
	if (!fs.existsSync(process.cwd() + '/plugins')) {
		fs.mkdirSync(process.cwd() + '/plugins');
	}
}

function add_platform_to_yepp_config(debug, platform) {
	var platforms = config.platforms();
	// To ensure that we don't add the platform to the yepp
	// config file twice, look if this platform is already
	// in the platforms array.
	var found = false;
	for (var i = 0; i < platforms.length; i++) {
		if (platforms[i] == platform) {
			found = true;
			break;
		}
	}
	if (!found) {
		platforms.push(platform);
	}
	// Store the platforms in the config file.
	config.platforms(platforms);
}

function add_requested_plaform(debug, platform) {
	logger.info('Adding ' + platform + ' platform...');
	// add the platform by cordova plaform add
	exec('cordova platform add ' + platform, function(error, stdout, stderr) {
		if (stderr) {
			logger.error(stderr);
		} else {
			if (debug) {
				logger.debug(stdout);
			}
			installPlatform(debug, platform);
		}
	});
}

function install_requested_platform(debug, platform) {
	logger.info('Installing ' + platform + ' platform...');
	// build the platform that user can call run later on
	exec('cordova build ' + platform, function(error, stdout, stderr) {
		if (stderr) {
			logger.error(stderr);
		} else {
			if (debug) {
				logger.debug(stdout);
			}
		}
	});
}
