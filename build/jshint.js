'use strict';

module.exports = function (cluck) {
  return cluck.shell.execute('jshint', ['.'], {resolveLocalBin: true});
};
