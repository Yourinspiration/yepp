var exec = require('child_process').exec;
var fs = require('fs');
var config = require('./config');
var logger = require('./logger');
var icons = require('./icons');
var utils = require('./utils');
var xml2js = require('xml2js');

module.exports.exec = function(debug, version) {
	cleanup();
	update_config_files_and_build_android(debug, version);
};

function update_config_files_and_build_android(debug, version) {
	config.version(version);
	var bowerConfigPath = process.cwd() + '/bower.json';
	if (fs.existsSync(bowerConfigPath)) {
		var yeppConfigData = fs.readFileSync(bowerConfigPath, 'utf8');
		var jsonData = JSON.parse(yeppConfigData);
		jsonData.version = version;
		fs.writeFileSync(bowerConfigPath, JSON.stringify(jsonData, null, 4));
	}
	var parser = new xml2js.Parser();
	var cordovaConfigPath = process.cwd() + '/config.xml';
	var cordovaConfig = fs.readFileSync(cordovaConfigPath, 'utf8');
	parser.parseString(cordovaConfig, function (err, result) {
		if (err) {
			logger.error(err);
		} else {
			result.widget.$.version = version;
        	var builder = new xml2js.Builder();
			var xml = builder.buildObject(result);
			fs.writeFileSync(cordovaConfigPath, xml);
        	build_android(debug, version);
		}
    });
}

function build_android(debug, version) {
	logger.info('Executing cordova build command...');
	exec('cordova build android', function(error, stdout, stderr) {
		if (error) {
			logger.error(error);
			process.exit(2);
		}
		icons.copyIcons(debug, 'android');
		var cwd = process.cwd() + '/platforms/android';
		logger.info('Executing ant release...');
		exec('ant release',  { cwd: cwd }, function(error, stdout, stderr) {
			if (error) {
				logger.error(error);
				process.exit(2);
			}

			signJar();
		});
	});
}

function cleanup() {
	if (fs.existsSync(process.cwd() + '/platforms/android/bin')) {
		utils.rmdir(process.cwd() + '/platforms/android/bin');
	}
}

function signJar() {
	var cwd = process.cwd() + '/platforms/android/bin';
	var jarsignerCmd = 'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 ' +
		'-keystore ' + process.cwd() + '/' + config.android().keystore + ' ' +
		'-storepass "' + config.android().storepass + '" ' +
		'-signedjar ' + config.application() + '-release-signed.apk ' +
		config.application() + '-release-unsigned.apk alias_name';
	logger.info('Executing jarsigner command...');
	exec(jarsignerCmd, { cwd: cwd }, function(error, stdout, stderr) {
		if (stderr) {
			logger.error(stderr);
			process.exit(2);
		}
		zipalign();
	});
}

function zipalign() {
	var cwd = process.cwd() + '/platforms/android/bin';
	var zipalignCmd = 'zipalign -v 4 ' + config.application() +
		'-release-signed.apk ' + config.application() + '.apk';
	logger.info('Executing zipalign command...');
	exec(zipalignCmd, { cwd: cwd }, function(error, stdout, stderr) {
		if (stderr) {
			logger.error(stderr);
			process.exit(2);
		} else {
			check_release_dir();
			copy_release_apk();
			logger.info('Android release finished');
		}
	});
}

function check_release_dir() {
	if (!fs.existsSync(process.cwd() + '/release')) {
		fs.mkdirSync(process.cwd() + '/release');
	}
}

function copy_release_apk() {
	var cwd = process.cwd() + '/platforms/android/bin';
	var source = cwd + '/' + config.application() + '.apk';
	var target = process.cwd() + '/release/' + config.application() + 
		'-' + config.version() + '.apk';
	fs.createReadStream(source).pipe(fs.createWriteStream(target));
}
