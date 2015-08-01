'use strict';

var _ = require('lodash');
var glob = require('glob');
var Mocha = require('mocha');
var Bluebird = require('bluebird');

module.exports = function (drunk) {
  drunk.register('jshint', function () {
    drunk.shell.promiseLocalBinExecution('jshint', ['.']);
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
};
