var fs = require('fs');
var prompt = require('prompt');
var exec = require('child_process').exec;
var logger = require('./logger');
var utils = require('./utils');

module.exports.exec = function(debug) {
	prompt.start();
	prompt.message = "[yepp]".green;

  	prompt.get(['application', 'description', 'id', 'version',
  		'author', 'email', 'url'], function (err, conf) {
		var path = process.cwd() + "/" + conf.application;
		// Create the application directory
		fs.mkdirSync(path);
		// Set the application directory as the current working directory
		process.chdir(path);
		// Let cordova ceate the basic structure
		exec('cordova create .', function(error, stdout, stderr) {
			if (stderr) {
				logger.error(stderr);
				cleanup(path);
			} else {
				if (debug) {
					logger.debug(stdout);
				}
				// Remove the generated www directory
				utils.rmdir(path + '/www');
				// Recreate an empty www directory
				fs.mkdirSync(path + '/www');

				// Create the hidden cordova directory
				fs.mkdirSync(path + '/.cordova');

				// Override the existing config.json
				createFileFromTemplate(path, conf, 'config.json.tmpl', '.cordova/config.json');
				createFileFromTemplate(path, conf, 'config.xml.tmpl', 'config.xml');
				createFileFromTemplate(path, conf, '.gitignore.tmpl', '.gitignore');

				if (process.argv[3] == 'mobileangular') {
					logger.info('Initializing application for Mobile Angular...');
					initMobileAngular(path, conf);
				} else {
					logger.info('Creating default application...');
					createFileFromTemplate(path, conf, 'bower.json.tmpl', 'bower.json');
				}
				
				createFileFromTemplate(path, conf, '.bowerrc.tmpl', '.bowerrc');
				createFileFromTemplate(path, conf, 'yepp.json.tmpl', 'yepp.json');

				logger.info('Created cordova app ' + conf.application);
				logger.info('Executing bower install...');

				exec('bower --silent install', function(error, stdout, stderr) {
					if (stderr) {
						logger.error(stderr);
						cleanup(path);
					} else {
						if (debug) {
							logger.debug(stdout);
						}
						logger.info('... done');
					}
				});
			}
		});
		
		process.stdin.pause();
  });
};

function cleanup(path) {
	process.chdir(path + '/..');
	utils.rmdir(path);
}

function initMobileAngular(path, conf) {
	createFileFromTemplate(path, conf, 'mobileangular/bower.json.tmpl', 'bower.json');
	createFileFromTemplate(path, conf, 'mobileangular/index.html.tmpl', 'www/index.html');
	fs.mkdirSync(path + '/www/js');
	createFileFromTemplate(path, conf, 'mobileangular/js/app.js.tmpl', 'www/js/app.js');
	createFileFromTemplate(path, conf, 'mobileangular/js/controllers.js.tmpl', 'www/js/controllers.js');
	createFileFromTemplate(path, conf, 'mobileangular/js/services.js.tmpl', 'www/js/services.js');
	fs.mkdirSync(path + '/www/templates');
	createFileFromTemplate(path, conf, 'mobileangular/templates/home.html.tmpl', 'www/templates/home.html');
}

function createFileFromTemplate(path, conf, template, file) {
	var data = fs.readFileSync(__dirname + '/templates/' + template, 'utf-8');
	fs.writeFileSync(path + '/' + file, replaceConfigParamsInText(data, conf));
}

function replaceConfigParamsInText(text, conf) {
	text = text.replace(/#application#/g, conf.application)
		.replace(/#description#/g, conf.description)
		.replace(/#id#/g, conf.id)
		.replace(/#version#/g, conf.version)
		.replace(/#author#/g, conf.author)
		.replace(/#email#/g, conf.email)
		.replace(/#url#/g, conf.url);
	return text;
}
