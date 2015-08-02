'use strict';

var _ = require('lodash');
var Bluebird = require('bluebird');

function TasksRunner() {
  this.run = run;

  function run(drunk, taskNames) {
    return Bluebird.each(taskNames, runTaskNamed, {concurrency: 1});

    function runTaskNamed(name) {
      drunk.log.info('Running "' + name + '" task');
      var task = drunk.tasks[name];
      return Bluebird.each(task.actions, runActions, {concurrency: 1});
    }

    function runActions(action) {
      if (_.isFunction(action)) {
        return action(drunk);
      }
      if (_.isString(action)) {
        return runTaskNamed(action);
      }
    }
  }
}

module.exports = TasksRunner;
