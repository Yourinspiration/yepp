![yepp logo](https://www.dropbox.com/s/eubfeszcjaxwlzu/logo.png?dl=1)

====

yepp is a command line tool for [Node.js](http://nodejs.org/) that combines existing tools like [cordova](http://cordova.apache.org/) and [bower](http://bower.io/) to create/bootstrap and manage (run, release etc.) cordova mobile apps more easily.

## Installation

```
npm install -g yepp
```

## Requirements

yepp is build ontop other tools. You must have installed cordova and bower to use yepp:

```
npm install -g cordova
npm install -g bower
```

## Commands

* init: bootstraps a new application
* cleanup: remove platforms and plugins
* plugins: load and install cordova plugins defined in yepp.json
* platforms: install platform defined in yepp.json
* install <platform>:  add platform and build project for given platform
* run <platform>: run app for given platform
* emulate <platform>: emulate the app for given platform
* release <platform>: create release for given platform

## Framework support

yepp currently supports [Mobile Angular UI](http://mobileangularui.com/) for application initialization. That means yepp will create a base for an application using the [Mobile Angular UI](http://mobileangularui.com/) framework:

```
yepp init mobileangular
```
