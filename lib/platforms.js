var exec = require('child_process').exec;
var fs = require('fs');

var yeppConfigPath = process.cwd() + '/yepp.json';
var platformsPath = process.cwd() + '/platforms';
var pluginsPath = process.cwd() + '/plugins';

module.exports.exec = function(debug) {
	if (fs.existsSync(yeppConfigPath)) {
		if (!fs.existsSync(platformsPath)) {
			fs.mkdirSync(platformsPath);
		}
		if (!fs.existsSync(pluginsPath)) {
			fs.mkdirSync(pluginsPath);
		}
		var yeppConfigData = fs.readFileSync(yeppConfigPath, 'utf8');
		var jsonData = JSON.parse(yeppConfigData);
		if (jsonData.platforms) {
			for (var i = 0; i < jsonData.platforms.length; i++) {
				addPlatform(debug, jsonData.platforms[i]);
			}
		} else {
			console.log('[yepp] INFO: No platforms specified.'.yellow);
		}
	} else {
		console.log('[yepp] ERROR: yepp.json does not exists'.red);
	}
}

function addPlatform(debug, platform) {
	console.log('[yepp] INFO: Adding platform '.green + platform.green + '...'.green);
	exec('cordova platform add ' + platform, function(error, stdout, stderr) {
		if (stderr) {
			console.error('[yepp] ERROR: '.red + stderr.red);
		} else {
			if (debug) {
				console.log('[yepp] DEBUG: '.cyan + stdout.cyan);
			}
		}
	});
}
