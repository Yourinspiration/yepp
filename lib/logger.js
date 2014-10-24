
module.exports.debug = function(message) {
	console.log('[yepp] DEBUG: '.cyan + message.cyan);
};

module.exports.info = function(message) {
	console.log('[yepp] INFO: '.green + message.green);
};

module.exports.warn = function(message) {
	console.log('[yepp] WARN: '.yellow + message.yellow);
};

module.exports.error = function(message) {
	console.error('[yepp] ERROR: '.red + message.red);
};
