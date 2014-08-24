var commander = require('commander-plus');
var fs = require("fs");
var prompt = require('prompt');

module.exports.exec = function() {

	prompt.start();

	prompt.message = "[yepp]".yellow;

  	prompt.get(['application', 'description', 'id', 'version',
  		'author', 'email', 'url'], function (err, conf) {
		var path = process.cwd() + "/" + conf.application;
		fs.mkdir(path, function(error) {
			if (error) {
				console.error("mkdir error: " + error.message);
			} else {
				createHooksDir(path);
				createPlatformsDir(path);
				createPluginsDir(path);
				createWWWDir(path);
				createConfigXml(path, conf);
				createGitIgnore(path);
				createBowerJson(path, conf);
				createBowerRc(path, conf);
				createyeppJson(path, conf);

				console.log('-----------');
				console.log('[yepp] INFO: created app '.green + conf.application.green);
				console.log('[yepp] INFO: execute bower install'.green);

				process.stdin.pause();
			}
		});

  });
}



function createPlatformsDir(path) {
	fs.mkdir(path + "/platforms", function(error) {
		if (error) {
			console.error("mkdir error: " + error.message);
		}
	});
}

function createHooksDir(path) {
	fs.mkdir(path + "/hooks", function(error) {
		if (error) {
			console.error("mkdir error: " + error.message);
		}
	});
}

function createPluginsDir(path) {
	fs.mkdir(path + "/plugins", function(error) {
		if (error) {
			console.error("mkdir error: " + error.message);
		}
	});
}

function createWWWDir(path) {
	fs.mkdir(path + "/www", function(error) {
		if (error) {
			console.error("mkdir error: " + error.message);
		}
	});
}

function createConfigXml(path, conf) {
	var data = '<?xml version="1.0" encoding="utf-8"?>\n'
		+ '<widget id="' + conf.id + '" version="' + conf.version + '" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">\n'
    	+ '\t<name>' + conf.application + '</name>\n'
    	+ '\t<description>\n\t\t' + conf.description + '\n\t</description>\n'
        + '\t<author email="' + conf.email + '" href="' + conf.url + '">\n'
        + '\t\t' + conf.author + '\n'
        + '\t</author>\n'
        + '\t<content src="index.html" />\n'
    	+ '\t<access origin="*" />\n'
		+ '</widget>';

	fs.writeFile(path + '/config.xml', data, function(error) {
		if (error) {
			console.error("write error: " + error.message);
		}
	});
}

function createGitIgnore(path) {
	var data = 'platforms/\nplugins/';

	fs.writeFile(path + '/.gitignore', data, function(error) {
		if (error) {
			console.error("write error: " + error.message);
		}
	});
}

function createBowerJson(path, conf) {
	fs.readFile(__dirname + '/templates/bower.json.tmpl', 'utf-8', function(error, data) {
		if (error) {
			console.error("error reading bower.json.templ: ".red + error.toString().red);
		}
		var data = replaceConfigParamsInText(data, conf);
		fs.writeFile(path + '/bower.json', data, function(error) {
			if (error) {
				console.error("error writing bower.json: ".red + error.toString().red);
			}
		});
	});
}

function createBowerRc(path, conf) {
	fs.readFile(__dirname + '/templates/.bowerrc.tmpl', 'utf-8', function(error, data) {
		if (error) {
			console.error("error reading .bowerrc.tmpl: ".red + error.toString().red);
		}
		fs.writeFile(path + '/.bowerrc', data, function(error) {
			if (error) {
				console.error("error writing .bowerrc: ".red + error.toString().red);
			}
		});
	});
}

function createyeppJson(path, conf) {
	fs.readFile(__dirname + '/templates/yepp.json.tmpl', 'utf-8', function(error, data) {
		if (error) {
			console.error("error reading yepp.json.templ: ".red + error.toString().red);
		}
		var data = replaceConfigParamsInText(data, conf);
		fs.writeFile(path + '/yepp.json', data, function(error) {
			if (error) {
				console.error("error writing yepp.json: ".red + error.toString().red);
			}
		});
	});
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