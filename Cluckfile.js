'use strict';

module.exports = function(cluck) {
  cluck.findAndRegisterTasks('build/**/*.js');
  cluck.withTask('test').doing('eslint', 'mocha');
  cluck.withTask('default').doing('test');
};
