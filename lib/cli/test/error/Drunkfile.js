'use strict';

module.exports = function (drunk) {
  global.tasksRun = [];

  drunk.withTask('task').doing(function () {
    throw new Error('bleh');
  });
};
