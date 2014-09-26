var fs = require('fs');

var yeppConfigPath = process.cwd() + '/yepp.json';

function get() {
	if (fs.existsSync(yeppConfigPath)) {
		var yeppConfigData = fs.readFileSync(yeppConfigPath, 'utf8');
		var jsonData = JSON.parse(yeppConfigData);
		return jsonData;
	} else {
		throw new Error('yepp.json does not exist');
	}
}

function save(jsonData) {
	if (fs.existsSync(yeppConfigPath)) {
		fs.writeFileSync(yeppConfigPath, JSON.stringify(jsonData, null, 4));
	} else {
		throw new Error('yepp.json does not exist');
	}
}

var platforms = function(platforms) {
	var config = get();
	if (platforms) {
		config.platforms = platforms;
		save(config);
	} else {
		if (config.platforms === null) {
			config.platforms = [];
			save(config);
		}
		return config.platforms;
	}
};

var plugins = function(plugins) {
	var config = get();
	if (plugins) {
		config.plugins = plugins;
		save(config);
	} else {
		if (config.plugins === null) {
			config.plugins = [];
			save(config);
		}
		return config.plugins;
	}
};

var application = function(application) {
	var config = get();
	if (application) {
		config.application = application;
		save(config);
	} else {
		if (config.application === null) {
			config.application = "";
			save(config);
		}
		return config.application;
	}
};

var description = function(description) {
	var config = get();
	if (description) {
		config.description = description;
		save(config);
	} else {
		if (config.description === null) {
			config.description = "";
			save(config);
		}
		return config.description;
	}
};

var id = function(id) {
	var config = get();
	if (id) {
		config.id = id;
		save(config);
	} else {
		if (config.id === null) {
			config.id = "";
			save(config);
		}
		return config.id;
	}
};

var version = function(version) {
	var config = get();
	if (version) {
		config.version = version;
		save(config);
	} else {
		if (config.version === null) {
			config.version = "";
			save(config);
		}
		return config.version;
	}
};

var author = function(author) {
	var config = get();
	if (author) {
		config.author = author;
		save(config);
	} else {
		if (config.author === null) {
			config.author = "";
			save(config);
		}
		return config.author;
	}
};

var email = function(email) {
	var config = get();
	if (email) {
		config.email = email;
		save(config);
	} else {
		if (config.email === null) {
			config.email = "";
			save(config);
		}
		return config.email;
	}
};

var url = function(url) {
	var config = get();
	if (url) {
		config.url = url;
		save(config);
	} else {
		if (config.url === null) {
			config.url = "";
			save(config);
		}
		return config.url;
	}
};

var android = function(android) {
	var config = get();
	if (android) {
		config.android = android;
		save(config);
	} else {
		if (config.android === null) {
			config.android = {
				keystore: "",
				storepass: ""
			};
			save(config);
		}
		return config.android;
	}
};

module.exports.platforms = platforms;
module.exports.plugins = plugins;
module.exports.application = application;
module.exports.description = description;
module.exports.id = id;
module.exports.version = version;
module.exports.author = author;
module.exports.email = email;
module.exports.url = url;
module.exports.android = android;
