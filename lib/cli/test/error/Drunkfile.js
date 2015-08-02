'use strict';

module.exports = function (drunk) {
  global.tasksRun = [];

  drunk.registerTask('task', function () {
    throw new Error('bleh');
  });
};
