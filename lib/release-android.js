var cp = require("child_process");
var fs = require("fs");
var commander = require('commander-plus');

module.exports.exec = function() {
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

					if (!jsonData.keystore ) {
						commander.prompt("[yepp] keystore: ", function(keystore) {
							if (!jsonData.storepass) {
								commander.prompt("[yepp] storepass: ", function(storepass) {
									signJar(jsonData.application, keystore, storepass);
									process.stdin.pause();
								});
							} else {
								signJar(jsonData.application, keystore, jsonData.storepass);
								process.stdin.pause();
							}
						});
					} else if (!jsonData.storepass) {
						commander.password("[yepp] storepass: ", function(storepass) {
							signJar(jsonData.application, jsonData.keystore, storepass);
							process.stdin.pause();
						});
					} else {
						signJar(jsonData.application, jsonData.keystore, jsonData.storepass);
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

function signJar(application, keystore, storepass) {
	var cwd = process.cwd() + '/platforms/android/bin';
	var jarsignerCmd = 'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 ' 
		+ '-keystore ' + keystore + ' '
		+ '-storepass ' + storepass + ' '
		+ application + '-release-unsigned.apk alias_name';
	console.log('[yepp] INFO: executing jarsigner command...');
	cp.exec(jarsignerCmd, { cwd: cwd }, function(error, stdout, stderr) {
		if (error) {
			console.log('[yepp] ERROR: ' + error.toString());
			process.exit(2);
		}
		zipalign(application);
	});
}

function zipalign(application) {
	var cwd = process.cwd() + '/platforms/android/bin';
	var zipalignCmd = 'zipalign -v 4 ' + application
		+ '-release-unsigned.apk ' + application + '.apk'
	console.log('[yepp] INFO: executing zipalign command...');
	cp.exec(zipalignCmd, { cwd: cwd }, function(error, stdout, stderr) {
		if (error) {
			console.log('[yepp] ERROR: ' + error.toString());
			process.exit(2);
		}
		console.log('[yepp] INFO: android release finished');
	});
}
