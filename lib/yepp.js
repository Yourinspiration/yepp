#! /usr/bin/env node

var init = require('./init');
var cleanup = require('./cleanup');
var plugins = require('./plugins');
var platforms = require('./platforms');
var install = require('./install');
var run = require('./run');
var emulate = require('./emulate');
var releaseAndroid = require('./release-android');

var command = process.argv[2];

if (command === undefined || command === 'help') {
	showHelp();
	process.exit(3);
} else if (command === 'init') {
	init.exec();
} else if (command === 'cleanup') {
	cleanup.exec();
} else if (command === 'plugins') {
	plugins.exec();
} else if (command === 'platforms') {
	platforms.exec();
} else if (command === 'install') {
	var platform = process.argv[3];
	if (platform === undefined || platform === null) {
		showHelp();
	} else if (platform === 'android') {
		install.exec('android');
	} else {
		console.log('[yepp] ERROR: Unsupported platform '.red + platform.red);
	}
} else if (command === 'run') {
	var platform = process.argv[3];
	if (platform === undefined || platform === null) {
		showHelp();
	} else if (platform === 'android') {
		run.exec('android');
	} else {
		console.log('[yepp] ERROR: Unsupported platform '.red + platform.red);
	}
} else if (command === 'emulate') {
	var platform = process.argv[3];
	if (platform === undefined || platform === null) {
		showHelp();
	} else if (platform === 'android') {
		emulate.exec('android');
	} else {
		console.log('[yepp] ERROR: Unsupported platform '.red + platform.red);
	}
} else if (command === 'release') {
	var platform = process.argv[3];
	if (platform === undefined || platform === null) {
		showHelp();
	} else if (platform === 'android') {
		releaseAndroid.exec();
	} else {
		console.log('[yepp] ERROR: Unsupported platform '.red + platform.red);
	}
} else {
	showHelp();
}

function showHelp() {
	console.log('\nUsage: yepp <command>\n'.cyan);
	console.log('Commands:\n'.cyan);
	console.log('  init                  initialize a new application'.cyan);
	console.log('  cleanup               remove platforms and plugins'.cyan);
	console.log('  plugins               load and install cordova plugins defined in yepp.json'.cyan);
	console.log('  platforms             install platform defined in yepp.json'.cyan);
	console.log('  install <platform>    build project'.cyan);
	console.log('  run <platform>        run app for given platform'.cyan);
	console.log('  emulate <platform>    emulate the app for given platform'.cyan);
	console.log('  release <platform>    create an android release'.cyan);
}
