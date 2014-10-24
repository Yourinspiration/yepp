#!/usr/bin/env node

var init = require('./init');
var cleanup = require('./cleanup');
var plugins = require('./plugins');
var platforms = require('./platforms');
var install = require('./install');
var run = require('./run');
var emulate = require('./emulate');
var releaseAndroid = require('./release-android');
var logger = require('./logger');

var command = process.argv[2];

var debug = false;
// Search for a debug flag in the command line arguments.
for (var i = 0; i < process.argv.length; i++) {
	if (process.argv[i] === '--debug') {
		debug = true;
		break;
	}
}

if (command === undefined || command === 'help') {
	showHelp();
	process.exit(3);
} else if (command === 'init') {
	init.exec(debug);
} else if (command === 'cleanup') {
	cleanup.exec(debug);
} else if (command === 'plugins') {
	plugins.exec(debug);
} else if (command === 'platforms') {
	platforms.exec(debug);
} else if (command === 'install') {
	var platform = process.argv[3];
	if (platform === undefined || platform === null) {
		showHelp();
	} else if (platform === 'android') {
		install.exec(debug, 'android');
	} else if (platform === 'ios') {
        install.exec(debug, 'ios');
    } else {
		logger.error('Unsupported platform ' + platform);
	}
} else if (command === 'run') {
	var platform = process.argv[3];
	if (platform === undefined || platform === null) {
		showHelp();
	} else if (platform === 'android') {
		run.exec(debug, 'android');
	} else {
		logger.error('Unsupported platform ' + platform);
	}
} else if (command === 'emulate') {
	var platform = process.argv[3];
	if (platform === undefined || platform === null) {
		showHelp();
	} else if (platform === 'android') {
		emulate.exec(debug, 'android');
	} else if (platform === 'ios') {
        emulate.exec(debug, 'ios');
    } else {
		logger.error('Unsupported platform ' + platform);
	}
} else if (command === 'release') {
	var platform = process.argv[3];
	var version = process.argv[4];
	if (platform === undefined || platform === null  ||
		version === undefined || version === null) {
		showHelp();
	} else if (platform === 'android') {
		releaseAndroid.exec(debug, version);
	} else {
		logger.error('Unsupported platform ' + platform);
	}
} else {
	showHelp();
}

function showHelp() {
	console.log('\nUsage: yepp <command>\n'.cyan);
	console.log('Commands:\n'.cyan);
	console.log('  init                     initialize a new application'.cyan);
	console.log('  cleanup                  remove platforms and plugins'.cyan);
	console.log('  plugins                  load and install cordova plugins defined in yepp.json'.cyan);
	console.log('  platforms                install platform defined in yepp.json'.cyan);
	console.log('  install <platform>       build project'.cyan);
	console.log('  run <platform>           run app for given platform'.cyan);
	console.log('  emulate <platform>       emulate the app for given platform'.cyan);
	console.log('  release <platform> <v>   create an android release for given version'.cyan);
}
