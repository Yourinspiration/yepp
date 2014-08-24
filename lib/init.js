var fs = require("fs");
var prompt = require('prompt');
var sh = require('execSync');

module.exports.exec = function() {

	prompt.start();

	prompt.message = "[yepp]".green;

  	prompt.get(['application', 'description', 'id', 'version',
  		'author', 'email', 'url'], function (err, conf) {
		var path = process.cwd() + "/" + conf.application;
		fs.mkdir(path, function(error) {
			if (error) {
				console.error("mkdir error: " + error.message);
			} else {
				fs.mkdirSync(path + '/platforms');
				fs.mkdirSync(path + '/hooks');
				fs.mkdirSync(path + '/plugins');
				fs.mkdirSync(path + '/www');

				createFileFromTemplate(path, conf, 'config.xml');
				createFileFromTemplate(path, conf, '.gitignore');
				createFileFromTemplate(path, conf, 'bower.json');
				createFileFromTemplate(path, conf, '.bowerrc');
				createFileFromTemplate(path, conf, 'yepp.json');

				console.log('[yepp] INFO: created cordova app '.green + conf.application.green);
				console.log('[yepp] INFO: executing bower install...'.green);

				process.chdir(path);
				sh.run('bower --silent install');

				process.stdin.pause();
			}
		});

  });
}

function createFileFromTemplate(path, conf, file) {
	var data = fs.readFileSync(__dirname + '/templates/' + file + '.tmpl', 'utf-8');
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