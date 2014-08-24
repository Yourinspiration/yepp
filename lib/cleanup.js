var fs = require("fs");

module.exports.exec = function() {
	console.log('[yepp] INFO: Removing platforms directory...'.green);
	if (fs.existsSync(process.cwd() + '/platforms')) {
		rmdir(process.cwd() + '/platforms');
	}
	console.log('[yepp] INFO: Removing plugins directory...'.green);
	if (fs.existsSync(process.cwd() + '/plugins')) {
		rmdir(process.cwd() + '/plugins');
	}
	console.log('[yepp] INFO: Cleanup done.'.green);
}

function rmdir(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file) {
			var f = path + "/" + file;
			var stats = fs.statSync(f);
			if (stats.isDirectory()) {
				rmdir(f);
			} else {
				fs.unlinkSync(f);
			}
		});
	};
	fs.rmdirSync(path);
}