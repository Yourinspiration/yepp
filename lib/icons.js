var fs = require('fs');

module.exports.copyIcons = function(debug, platform) {
	if (platform == 'android') {
		copyIcon(process.cwd() + '/icons/android/icon-ldpi.png', process.cwd() + '/platforms/android/res/drawable-ldpi/icon.png');
		copyIcon(process.cwd() + '/icons/android/icon-mdpi.png', process.cwd() + '/platforms/android/res/drawable-mdpi/icon.png');
		copyIcon(process.cwd() + '/icons/android/icon-hdpi.png', process.cwd() + '/platforms/android/res/drawable-hdpi/icon.png');
		copyIcon(process.cwd() + '/icons/android/icon-xhdpi.png', process.cwd() + '/platforms/android/res/drawable-xhdpi/icon.png');
		copyIcon(process.cwd() + '/icons/android/icon.png', process.cwd() + '/platforms/android/res/drawable/icon.png');
		copyIcon(process.cwd() + '/icons/android/land-hdpi.png', process.cwd() + '/platforms/android/res/drawable-land-hdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/land-ldpi.png', process.cwd() + '/platforms/android/res/drawable-land-ldpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/land-mdpi.png', process.cwd() + '/platforms/android/res/drawable-land-mdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/land-xhdpi.png', process.cwd() + '/platforms/android/res/drawable-land-xhdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/port-hdpi.png', process.cwd() + '/platforms/android/res/drawable-port-hdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/port-ldpi.png', process.cwd() + '/platforms/android/res/drawable-port-ldpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/port-mdpi.png', process.cwd() + '/platforms/android/res/drawable-port-mdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/port-xhdpi.png', process.cwd() + '/platforms/android/res/drawable-port-xhdpi/screen.png');
	}
};

function copyIcon(source, target) {
	if (fs.existsSync(source)) {
		fs.createReadStream(source).pipe(fs.createWriteStream(target));
	}
}
