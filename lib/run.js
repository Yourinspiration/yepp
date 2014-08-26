var sh = require('execsync-ng');

module.exports.exec = function(platform) {
	console.log('[yepp] INFO: Running platform '.green + platform.green + '...'.green);
	sh.exec('cordova run ' + platform);
}