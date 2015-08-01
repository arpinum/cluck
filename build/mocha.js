'use strict';

var _ = require('lodash');
var Mocha = require('mocha');
var Bluebird = require('bluebird');

module.exports = function (drunk) {
  return drunk.files.promiseGlobbing('lib/**/*.spec.js')
    .then(function (files) {
      var mocha = new Mocha({reporter: 'spec'});
      _.forEach(files, function (spec) {
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
