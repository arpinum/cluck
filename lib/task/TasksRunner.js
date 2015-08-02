'use strict';

var Bluebird = require('bluebird');

function TasksRunner() {
  this.run = run;

  function run(drunk, taskNames) {
    return Bluebird.map(taskNames, runTask, {concurrency: 1});

    function runTask(name) {
      drunk.log.info('Running "' + name + '" task');
      return drunk.tasks[name].action(drunk);
    }
  }
}

module.exports = TasksRunner;
