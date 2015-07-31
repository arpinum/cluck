'use strict';

var _ = require('lodash');
var path = require('path');
var spawn = require('cross-spawn');
var glob = require('glob');
var Mocha = require('mocha');
var Bluebird = require('bluebird');

module.exports = function (drunk) {
  drunk.register('jshint', function () {
    executeBin('jshint', ['.']);
  });

  drunk.register('mocha', function () {
    var desktopSpecs = glob.sync('lib/**/*.spec.js');
    var mocha = new Mocha({reporter: 'spec'});
    _.forEach(desktopSpecs, function (spec) {
      mocha.addFile(spec);
    });
    return new Bluebird(function (resolve, reject) {
      mocha.run(function (failures) {
        if (failures) {
          reject();
        }
        resolve();
      });
    });
  });

  function executeBin(binary, args, options) {
    var shellOptions = _.merge(defaultShellOptions(), options);
    var binaryPath = resolveExecutable(binary);
    var execution = spawn.sync.call(null, binaryPath, args, shellOptions);
    if (execution.status !== 0) {
      var error = execution.error || new Error('Task failed');
      console.error(error);
    }
  }

  function resolveExecutable(name) {
    return path.resolve('node_modules', '.bin', name);
  }

  function defaultShellOptions() {
    return {stdio: 'inherit', encoding: 'UTF-8'};
  }
};
