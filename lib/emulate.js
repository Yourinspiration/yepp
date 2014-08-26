var sh = require('execsync-ng');

module.exports.exec = function(platform) {
	console.log('[yepp] INFO: Emulating platform '.green + platform.green + '...'.green);
	sh.exec('cordova emulate ' + platform);
}