'use strict';

module.exports = function (cluck) {
  global.tasksRun = [];

  cluck.withTask('first').doing(function () {
    global.tasksRun.push('first task');
  });

  cluck.withTask('second').doing(function () {
    global.tasksRun.push('second task');
  });
};
