'use strict';

module.exports = function (drunk) {
  global.tasksRun = [];

  drunk.withTask('first').doing(function () {
    global.tasksRun.push('first task');
  });

  drunk.withTask('second').doing(function () {
    global.tasksRun.push('second task');
  });
};
