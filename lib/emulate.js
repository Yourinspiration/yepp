var exec = require('child_process').exec;

module.exports.exec = function(debug, platform) {
	console.log('[yepp] INFO: Emulating platform '.green + platform.green + '...'.green);
	exec('cordova emulate ' + platform, function(error, stdout, stderr) {
		if (stderr) {
			console.error('[yepp] ERROR: '.red + stderr.red);
		} else {
			if (debug) {
				console.log('[yepp] DEBUG: '.cyan + stdout.cyan);
			}
		}
	});
}