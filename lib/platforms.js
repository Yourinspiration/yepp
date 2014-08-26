var sh = require('execsync-ng');
var fs = require('fs');

var yeppConfigPath = process.cwd() + '/yepp.json';
var platformsPath = process.cwd() + '/platforms';
var pluginsPath = process.cwd() + '/plugins';

module.exports.exec = function() {
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
				addPlatform(jsonData.platforms[i]);
			}
		} else {
			console.log('[yepp] INFO: No platforms specified.'.yellow);
		}
	} else {
		console.log('[yepp] ERROR: yepp.json does not exists'.red);
	}
}

function addPlatform(platform) {
	console.log('[yepp] INFO: Adding platform '.green + platform.green + '...'.green);
	sh.exec('cordova platform add ' + platform);
	console.log('[yepp] INFO: ... done'.green);
}
