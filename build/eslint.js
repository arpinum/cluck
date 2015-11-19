'use strict';

var shell = require('building').shell;

module.exports = function () {
  return shell.execute('eslint', ['.'], {resolveLocalBin: true});
};
