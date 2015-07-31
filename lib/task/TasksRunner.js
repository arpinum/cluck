'use strict';

var Bluebird = require('bluebird');

function TasksRunner(drunk) {
  this.promiseRun = promiseRun;

  function promiseRun(taskNames) {
    return Bluebird.map(taskNames, promiseTaskRun, {concurrency: 1});
  }

  function promiseTaskRun(name) {
    drunk.tasks[name].action(drunk);
  }
}

module.exports = TasksRunner;
