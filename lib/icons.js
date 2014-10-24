var fs = require('fs');
var config = require('./config');
var logger = require('./logger');

module.exports.copyIcons = function(debug, platform, name) {
	if (platform == 'android') {
		copyIcon(process.cwd() + '/icons/android/icon-ldpi.png',
			process.cwd() + '/platforms/android/res/drawable-ldpi/icon.png');
		copyIcon(process.cwd() + '/icons/android/icon-mdpi.png',
			process.cwd() + '/platforms/android/res/drawable-mdpi/icon.png');
		copyIcon(process.cwd() + '/icons/android/icon-hdpi.png',
			process.cwd() + '/platforms/android/res/drawable-hdpi/icon.png');
		copyIcon(process.cwd() + '/icons/android/icon-xhdpi.png',
			process.cwd() + '/platforms/android/res/drawable-xhdpi/icon.png');
		copyIcon(process.cwd() + '/icons/android/icon.png',
			process.cwd() + '/platforms/android/res/drawable/icon.png');
		copyIcon(process.cwd() + '/icons/android/land-hdpi.png',
			process.cwd() + '/platforms/android/res/drawable-land-hdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/land-ldpi.png',
			process.cwd() + '/platforms/android/res/drawable-land-ldpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/land-mdpi.png',
			process.cwd() + '/platforms/android/res/drawable-land-mdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/land-xhdpi.png',
			process.cwd() + '/platforms/android/res/drawable-land-xhdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/port-hdpi.png',
			process.cwd() + '/platforms/android/res/drawable-port-hdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/port-ldpi.png',
			process.cwd() + '/platforms/android/res/drawable-port-ldpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/port-mdpi.png',
			process.cwd() + '/platforms/android/res/drawable-port-mdpi/screen.png');
		copyIcon(process.cwd() + '/icons/android/port-xhdpi.png',
			process.cwd() + '/platforms/android/res/drawable-port-xhdpi/screen.png');
	} else if (platform === 'ios') {
		copyIcon(process.cwd() + '/icons/ios/icon-40.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-40.png');
		copyIcon(process.cwd() + '/icons/ios/icon-40@2x.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-40@2x.png');
		copyIcon(process.cwd() + '/icons/ios/icon-50.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-50.png');
		copyIcon(process.cwd() + '/icons/ios/icon-50@2x.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-50@2x.png');
		copyIcon(process.cwd() + '/icons/ios/icon-60.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-60.png');
		copyIcon(process.cwd() + '/icons/ios/icon-60@2x.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-60@2x.png');
		copyIcon(process.cwd() + '/icons/ios/icon-72.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-72.png');
		copyIcon(process.cwd() + '/icons/ios/icon-72@2x.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-72@2x.png');
		copyIcon(process.cwd() + '/icons/ios/icon-76.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-76.png');
		copyIcon(process.cwd() + '/icons/ios/icon-76@2x.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-76@2x.png');
		copyIcon(process.cwd() + '/icons/ios/icon-small.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-small.png');
		copyIcon(process.cwd() + '/icons/ios/icon-small@2x.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon-small@2x.png');
		copyIcon(process.cwd() + '/icons/ios/icon.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon.png');
		copyIcon(process.cwd() + '/icons/ios/icon@2x.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/icons/icon@2x.png');
		
		copyIcon(process.cwd() + '/icons/ios/splash.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/splash/Default-568h@2x~iphone.png');
		copyIcon(process.cwd() + '/icons/ios/splash.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/splash/Default-Landscape@2x~ipad.png');
		copyIcon(process.cwd() + '/icons/ios/splash.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/splash/Default-Landscape~ipad.png');
		copyIcon(process.cwd() + '/icons/ios/splash.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/splash/Default-Portrait@2x~ipad.png');
		copyIcon(process.cwd() + '/icons/ios/splash.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/splash/Default-Portrait~ipad.png');
		copyIcon(process.cwd() + '/icons/ios/splash.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/splash/Default@2x~iphone.png');
		copyIcon(process.cwd() + '/icons/ios/splash.png',
			process.cwd() + '/platforms/ios/' + config.application() + '/Resources/splash/Default~iphone.png');
	}
};

function copyIcon(source, target) {
	if (fs.existsSync(source)) {
		fs.createReadStream(source).pipe(fs.createWriteStream(target));
	} else {
		logger.warn("Icon " + source + " not found");
	}
}
