'use strict';

module.exports = function (cluck) {
  cluck.findAndRegisterTasks('build/**/*.js');

  cluck.withTask('default').doing('jshint', 'mocha');
};
