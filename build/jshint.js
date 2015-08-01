'use strict';

module.exports = function (drunk) {
  return drunk.shell.promiseLocalBinExecution('jshint', ['.']);
};
