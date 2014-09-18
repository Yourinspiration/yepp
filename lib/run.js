var exec = require('child_process').exec;
var fs = require('fs');

module.exports.exec = function(debug, platform) {
	var path = process.cwd() + '/yepp.json';
	if (fs.existsSync(path)) {
		var data = fs.readFileSync(path, 'utf8');
		var jsonData = JSON.parse(data);
		var icon = jsonData.icons.icon;
		var screen = jsonData.icons.screen;
		if (platform == 'android') {
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable/icon.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-hdpi/icon.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-ldpi/icon.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-mdpi/icon.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-xhdpi/icon.png'));

			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-land-hdpi/screen.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-land-ldpi/screen.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-land-mdpi/screen.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-land-xhdpi/screen.png'));

			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-port-hdpi/screen.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-port-ldpi/screen.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-port-mdpi/screen.png'));
			fs.createReadStream(icon).pipe(fs.createWriteStream(process.cwd() + '/platforms/android/res/drawable-port-xhdpi/screen.png'));
		}
		console.log('[yepp] INFO: Running platform '.green + platform.green + '...'.green);
		exec('cordova run ' + platform, function(error, stdout, stderr) {
			if (stderr) {
				console.error('[yepp] ERROR: '.red + stderr.red);
			} else {
				if (debug) {
					console.log('[yepp] DEBUG: '.cyan + stdout.cyan);
				}
			}
		});
	} else {
		console.log('[yepp] ERROR: yepp.json does not exists'.red);
	}
}