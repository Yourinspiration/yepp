var sh = require('execsync-ng');
var fs = require("fs");
var platforms = require('./platforms');

var yeppConfigPath = process.cwd() + '/yepp.json';

module.exports.exec = function(platform) {
	if (fs.existsSync(yeppConfigPath)) {
		
		if (!fs.existsSync(process.cwd() + '/platforms')) {
			fs.mkdirSync(process.cwd() + '/platforms');
		}
		if (!fs.existsSync(process.cwd() + '/plugins')) {
			fs.mkdirSync(process.cwd() + '/plugins');
		}

		

		var yeppConfigData = fs.readFileSync(yeppConfigPath, 'utf8');
		var jsonData = JSON.parse(yeppConfigData);
		if (jsonData.platforms) {
			var found = false;
			for (var i = 0; i < jsonData.platforms.length; i++) {
				if (jsonData.platforms[i] == platform) {
					found = true;
					break;
				}
			}
			if (!found) {
				jsonData.platforms.push(platform);
			}
		} else {
			jsonData.platforms = [platform];
		}

		fs.writeFileSync(yeppConfigPath, JSON.stringify(jsonData, null, 4));

		platforms.exec();

		installPlatform(platform);

		copyIcons(platform);
	} else {
		console.log('[yepp] ERROR: yepp.json does not exists'.red);
	}
}

function installPlatform(platform) {
	console.log('[yepp] INFO: Installing '.green + platform.green + ' platform...'.green);
	sh.exec('cordova build ' + platform);
	console.log('[yepp] INFO: ... done.'.green);
}

function copyIcons(platform) {
	if (platform == 'android') {
		copyIcon('www/res/icon/android/icon-36-ldpi.png', 'platforms/android/res/drawable-ldpi/icon.png');
		copyIcon('www/res/icon/android/icon-48-mdpi.png', 'platforms/android/res/drawable-mdpi/icon.png');
		copyIcon('www/res/icon/android/icon-72-hdpi.png', 'platforms/android/res/drawable-hdpi/icon.png');
		copyIcon('www/res/icon/android/icon-96-xhdpi.png', 'platforms/android/res/drawable-xhdpi/icon.png');
		copyIcon('www/res/icon/android/icon-96-xhdpi.png', 'platforms/android/res/drawable/icon.png');
	}
}

function copyIcon(source, target) {
	if (fs.existsSync(source)) {
		fs.createReadStream(source).pipe(fs.createWriteStream(target));
	}
}
