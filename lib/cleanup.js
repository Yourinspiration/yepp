var utils = require("./utils");

module.exports.exec = function(debug) {
	console.log('[yepp] INFO: Removing platforms directory...'.green);
	utils.rmdir(process.cwd() + '/platforms');
	console.log('[yepp] INFO: Removing plugins directory...'.green);
	utils.rmdir(process.cwd() + '/plugins');
};
