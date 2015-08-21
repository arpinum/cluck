'use strict';

function ErrorLogger(logger, configuration) {
  this.log = log;

  function log(error) {
    var message = 'Something went wrong';
    if (error && error.message) {
      message += ': ' + error.message;
    }
    logger.error(message);
    if (error && error.stack && configuration.stack) {
      logger.error(error.stack);
    }
  }
}

module.exports = ErrorLogger;
