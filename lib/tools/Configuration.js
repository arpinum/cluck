'use strict';

function Configuration(options) {
  var self = this;
  self.logLevel = options.logLevel || 'info';
}

module.exports = Configuration;
