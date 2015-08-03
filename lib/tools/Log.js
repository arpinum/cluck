'use strict';

var _ = require('lodash');
var log4js = require('log4js');

var KNOWN_LEVELS = ['debug', 'info', 'warn', 'error', 'off'];

log4js.configure({
  appenders: [
    {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[(@<  %m%]'
      },
    },
  ],
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
      var message = [
        'The log level "',
        configuration.logLevel,
        '" is unknown. Level must be in [',
        KNOWN_LEVELS,
        ']'].join('');
      throw new Error(message);
    }
  }

  function createLogger() {
    var logger = log4js.getLogger();
    logger.setLevel(configuration.logLevel);
    return logger;
  }
}

module.exports = Log;
