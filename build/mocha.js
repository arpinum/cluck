'use strict';

var shell = require('building').shell;

module.exports = function () {
  return shell.execute(
    'mocha',
    ['--colors', '--reporter', 'spec', '--recursive', 'lib'],
    {resolveLocalBin: true});
};
