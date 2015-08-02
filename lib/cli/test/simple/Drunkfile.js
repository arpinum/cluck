'use strict';

module.exports = function (drunk) {
  global.tasksRun = [];

  drunk.registerTask('first', function () {
    global.tasksRun.push('first task');
  });

  drunk.registerTask('second', function () {
    global.tasksRun.push('second task');
  });
};
