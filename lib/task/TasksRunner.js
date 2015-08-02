'use strict';

var Bluebird = require('bluebird');

function TasksRunner(drunk) {
  this.run = run;

  function run(taskNames) {
    return Bluebird.map(taskNames, runTask, {concurrency: 1});
  }

  function runTask(name) {
    drunk.tasks[name].action(drunk);
  }
}

module.exports = TasksRunner;
