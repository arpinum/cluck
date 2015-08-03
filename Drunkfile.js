'use strict';

module.exports = function (drunk) {
  drunk.findAndRegisterTasks('build/**/*.js');

  drunk.withTask('default').doing('jshint', 'mocha');
};
