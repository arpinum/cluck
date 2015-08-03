'use strict';

var _ = require('lodash');
var Bluebird = require('bluebird');
var path = require('path');
var spawn = require('cross-spawn');

function Shell() {
  var self = this;
  self.execute = execute;
  self.createExecution = createExecution;

  function execute(binary, args, options) {
    return createExecution(binary, args, options).promise;
  }

  function createExecution(binary, args, options) {
    var theOptions = _.merge(defaultExecuteOptions(), options);
    var theBinary = binaryFrom(binary, theOptions);
    var value = spawn.call(null, theBinary, args, theOptions.spawn);
    var promise = executionPromise(value);
    return {
      value: value,
      promise: promise
    };
  }

  function binaryFrom(binary, options) {
    if (options.resolveLocalBin) {
      return path.resolve('node_modules', '.bin', binary);
    }
    return binary;
  }

  function executionPromise(execution) {
    return new Bluebird(function (resolve, reject) {
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

  function defaultExecuteOptions() {
    return {
      resolveLocalBin: false,
      spawn: {
        stdio: 'inherit',
        encoding: 'UTF-8'
      }
    };
  }
}

module.exports = Shell;
