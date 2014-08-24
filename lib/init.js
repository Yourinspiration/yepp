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
	var data = '{\n'
  		+ '\t"name": "' + conf.application + '",\n'
  		+ '\t"version": "' + conf.version + '",\n'
  		+ '\t"private": true,\n'
  		+ '\t"ignore": [\n'
    	+ '\t\t".jshintrc",\n'
    	+ '\t\t"**/*.txt"\n'
  		+ '\t],\n'
  		+ '\t"dependencies": {\n'
    	+ '\t\t"angular": "*",\n'
    	+ '\t\t"angular-route": "*",\n'
    	+ '\t\t"angular-resource": "*"\n'
  		+ '\t},\n'
  		+ '\t"devDependencies": {\n'
    	+ '\t\t"should": "*"\n'
  		+ '\t}\n'
		+ '}';

	fs.writeFile(path + '/bower.json', data, function(error) {
		if (error) {
			console.error("write error: " + error.message);
		}
	});
}

function createBowerRc(path, conf) {
	var data = '{\n'
  		+ '\t"directory": "/www/lib"\n'
		+ '}';

	fs.writeFile(path + '/.bowerrc', data, function(error) {
		if (error) {
			console.error("write error: " + error.message);
		}
	});
}

function createyeppJson(path, conf) {
	// Read the template file for yepp.json
	fs.readFile(__dirname + '/templates/yepp.json.tmpl', 'utf-8', function(error, data) {
		if (error) {
			console.error("error reading yepp.json.templ: ".red + error.toString().red);
		}
		// Replace the application name placeholder
		var data = data.replace('#application#', conf.application);
		// Write the yepp.json file
		fs.writeFile(path + '/yepp.json', data, function(error) {
			if (error) {
				console.error("error writing yepp.json: ".red + error.toString().red);
			}
		});
	});
}