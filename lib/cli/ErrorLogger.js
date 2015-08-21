'use strict';

function ErrorLogger(logger) {
  this.log = log;

  function log(error, command) {
    var message = 'Something went wrong';
    if (error && error.message) {
      message += ': ' + error.message;
    }
    logger.error(message);
    if (error && error.stack && command.stack) {
      logger.error(error.stack);
    }
  }
}

module.exports = ErrorLogger;
