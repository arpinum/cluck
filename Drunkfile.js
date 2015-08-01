'use strict';

module.exports = function (drunk) {
  drunk.findAndRegisterTasks('build/**/*.js');
};
