'use strict';

var _ = require('lodash');

function Configuration() {
}

Configuration.from = function (options) {
  return _.defaults({
    logLevel: options.logLevel,
    stack: options.stack,
    stats: options.stats
  }, Configuration.default());
};

Configuration.default = function () {
  return {
    logLevel: 'info',
    stack: false,
    stats: false
  };
};

module.exports = Configuration;
