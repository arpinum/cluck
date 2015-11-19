'use strict';

var _ = require('lodash');
var _s = require('underscore.string');
var log4js = require('log4js');

var KNOWN_LEVELS = ['debug', 'info', 'warn', 'error', 'off'];

log4js.configure({
  appenders: [
    {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[(@<  %m%]'
      }
    }
  ]
});

function Log(configuration) {
  checkConfiguration();
  var logger = createLogger();
  var self = this;
  _.each(_.without(KNOWN_LEVELS, 'off'), function (level) {
    self[level] = _.bind(logger[level], logger);
  });

  function checkConfiguration() {
    if (configuration.logLevel && !_.includes(KNOWN_LEVELS, configuration.logLevel)) {
      var message = _s.sprintf(
        'The log level "%s" is unknown. Level must be in [%s]',
        configuration.logLevel,
        KNOWN_LEVELS);
      throw new Error(message);
    }
  }

  function createLogger() {
    var newLogger = log4js.getLogger();
    newLogger.setLevel(configuration.logLevel);
    return newLogger;
  }
}

module.exports = Log;
