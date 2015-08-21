'use strict';

function Configuration() {
}

Configuration.from = function (options) {
  var $default = Configuration.default;
  return {
    logLevel: options.logLevel || $default.logLevel,
    stack: options.stack || $default.stack
  };
};

Configuration.default = function () {
  return {
    logLevel: 'info',
    stack: false
  };
};

module.exports = Configuration;
