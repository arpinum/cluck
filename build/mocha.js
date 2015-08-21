'use strict';

module.exports = function (cluck) {
  return cluck.shell.execute(
    'mocha',
    ['--colors', '--reporter', 'spec', '--recursive', 'lib'],
    {resolveLocalBin: true});
};
