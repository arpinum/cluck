'use strict';

var _ = require('lodash');

function Configuration() {
}

Configuration.from = function (options) {
  return _.defaults({
    logLevel: options.logLevel,
    stack: options.stack
  }, Configuration.default());
};

Configuration.default = function () {
  return {
    logLevel: 'info',
    stack: false
  };
};

module.exports = Configuration;
