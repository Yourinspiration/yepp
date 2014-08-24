var cp = require("child_process");
var fs = require("fs");

module.exports.exec = function(platform) {
	if (!fs.existsSync(process.cwd() + '/platforms')) {
		fs.mkdirSync(process.cwd() + '/platforms');
	}
	if (!fs.existsSync(process.cwd() + '/plugins')) {
		fs.mkdirSync(process.cwd() + '/plugins');
	}

	if (!fs.existsSync(process.cwd() + '/platforms/' + platform)) {
		console.log('[yepp] INFO: Adding platform ' + platform);
		cp.exec('cordova platform add ' + platform, function(error, stdout, stderr) {
			if (error) {
				console.error('[yepp] ERROR: '.red + error.toString().red);
				process.exit(2);
			} else {
				installPlatform(platform);
			}
		});
	} else {
		installPlatform(platform);
	}
}

function installPlatform(platform) {
	console.log('[yepp] INFO: Installing '.green + platform.green + ' platform...'.green);
	cp.exec('cordova build ' + platform, function(error, stdout, stderr) {
		if (error) {
			console.error('[yepp] ERROR: '.red + error.toString().red);
			process.exit(2);
		} else {
			console.log('[yepp] INFO: Installation done.'.green);
		}
	});
}
