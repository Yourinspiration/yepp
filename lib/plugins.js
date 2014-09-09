var cp = require("child_process");
var fs = require("fs");

module.exports.exec = function(debug) {
	var path = process.cwd() + '/yepp.json';
	if (fs.existsSync(path)) {
		var data = fs.readFileSync(path, 'utf8');
		var jsonData = JSON.parse(data);
		for (var i = 0; i < jsonData.plugins.length; i++) {
			addPlugin(jsonData.plugins[i]);
		}
	} else {
		console.log('[yepp] ERROR: yepp.json does not exists'.red);
	}
}

function addPlugin(plugin) {
	cp.exec('cordova plugin add ' + plugin, function(error, stdout, stderr) {
		if (error) {
			console.error('[yepp] ERROR: '.red + error.toString().red);
		}
		console.log('[yepp] INFO: Adding plugin '.green + plugin.green);
	});
}