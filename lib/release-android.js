var cp = require("child_process");
var fs = require("fs");
var prompt = require('prompt');

module.exports.exec = function(debug) {

	prompt.start();

	prompt.message = "[yepp]".green;

	var path = process.cwd() + '/yepp.json';
	if (fs.existsSync(path)) {
		var data = fs.readFileSync(path, 'utf8');
		var jsonData = JSON.parse(data);

		if (jsonData.application) {
			cleanup();
			// Build android
			var cordovaBuildCmd = 'cordova build android';
			console.log('[yepp] INFO: executing cordova build command...');
			cp.exec(cordovaBuildCmd, function(error, stdout, stderr) {
				if (error) {
					console.log('[yepp] ERROR: ' + error.toString());
					process.exit(2);
				}
				// Create release with ant
				var cwd = process.cwd() + '/platforms/android';
				console.log('[yepp] INFO: executing ant release...');
				cp.exec('ant release',  { cwd: cwd }, function(error, stdout, stderr) {
					if (error) {
						console.log('[yepp] ERROR: ' + error.toString());
						process.exit(2);
					}

					if (!jsonData.keystore || !jsonData.storepass) {
						console.error('[yepp] ERROR: please define keystore and storepass in yepp.json'.red);
					} else {
						signJar(jsonData);
					}
				});
			});
		} else {
			console.log('[yepp] ERROR: yepp.json does not contain the application entry');
		}
	} else {
		console.log('[yepp] ERROR: yepp.json does not exists');
	}
}

function cleanup() {
	rmdir(process.cwd() + '/platforms/android/bin');
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

function signJar(jsonData) {
	var cwd = process.cwd() + '/platforms/android/bin';
	var jarsignerCmd = 'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 ' 
		+ '-keystore ' + process.cwd() + '/' + jsonData.keystore + ' '
		+ '-storepass "' + jsonData.storepass + '" '
		+ '-signedjar ' + jsonData.application + '-release-signed.apk '
		+ jsonData.application + '-release-unsigned.apk alias_name';
	console.log('[yepp] INFO: executing jarsigner command...');
	cp.exec(jarsignerCmd, { cwd: cwd }, function(error, stdout, stderr) {
		if (error) {
			console.log('[yepp] ERROR: ' + error.toString());
			process.exit(2);
		}
		zipalign(jsonData);
	});
}

function zipalign(jsonData) {
	var cwd = process.cwd() + '/platforms/android/bin';
	var zipalignCmd = 'zipalign -v 4 ' + jsonData.application
		+ '-release-signed.apk ' + jsonData.application + '.apk'
	console.log('[yepp] INFO: executing zipalign command...');
	cp.exec(zipalignCmd, { cwd: cwd }, function(error, stdout, stderr) {
		if (error) {
			console.log('[yepp] ERROR: ' + error.toString());
			process.exit(2);
		} else {
			if (!fs.existsSync(process.cwd() + '/release')) {
				fs.mkdirSync(process.cwd() + '/release');
			}
			fs.createReadStream(cwd + '/' + jsonData.application + '.apk')
				.pipe(fs.createWriteStream(process.cwd() + '/release/' + jsonData.application + '-' + jsonData.version + '.apk'));
			console.log('[yepp] INFO: android release finished');
		}
		
	});
}
