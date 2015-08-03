'use strict';

module.exports = function (cluck) {
  global.tasksRun = [];

  cluck.withTask('task').doing(function () {
    throw new Error('bleh');
  });
};
