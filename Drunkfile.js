'use strict';

module.exports = function (drunk) {
  drunk.findAndRegisterTasks('build/**/*.js');

  drunk.registerTask('default', ['jshint', 'mocha']);
};
