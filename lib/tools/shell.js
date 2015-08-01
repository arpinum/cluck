'use strict';

var _ = require('lodash');
var Bluebird = require('bluebird');
var path = require('path');
var spawn = require('cross-spawn');

function Shell() {
  var self = this;
  self.promiseLocalBinExecution = promiseLocalBinExecution;
  self.promiseExecution = promiseExecution;

  function promiseLocalBinExecution(binary, args, options) {
    return promiseExecution(resolveLocalBin(binary), args, options);
  }

  function promiseExecution(binary, args, options) {
    return new Bluebird(function (resolve, reject) {
      var shellOptions = _.merge(defaultShellOptions(), options);
      var execution = spawn.call(null, binary, args, shellOptions);
      execution.on('close', executionClosed);
      execution.on('error', reject);

      function executionClosed(code) {
        if (code !== 0) {
          reject(new Error('Executions failed'));
        }
        resolve();
      }
    });
  }

  function resolveLocalBin(name) {
    return path.resolve('node_modules', '.bin', name);
  }

  function defaultShellOptions() {
    return {stdio: 'inherit', encoding: 'UTF-8'};
  }
}

module.exports = Shell;
