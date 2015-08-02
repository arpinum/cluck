'use strict';

module.exports = function (drunk) {
  return drunk.shell.executeBin('jshint', ['.']);
};
