var fs = require('fs');

// Remove all files and directories instead the given folder.
var rmdir = function(path) {
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
		fs.rmdirSync(path);
	}
};

module.exports.rmdir = rmdir;
