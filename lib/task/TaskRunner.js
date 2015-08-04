'use strict';

var _ = require('lodash');
var Bluebird = require('bluebird');

function TaskRunner(cluck) {
  this.run = run;

  function run(taskNames) {
    var theTaskNames = _.isEmpty(taskNames) ? ['default'] : taskNames;
    return Bluebird.each(theTaskNames, runTaskNamed, {concurrency: 1});

    function runTaskNamed(name) {
      checkTaskExistance(name);
      cluck.log.info('Running "' + name + '" task');
      var task = cluck.tasks[name];
      return Bluebird.each(task.actions, runActions, {concurrency: 1});
    }

    function checkTaskExistance(name) {
      if (_.isUndefined(cluck.tasks[name])) {
        throw new Error('The "' + name + '" task is unknown');
      }
    }

    function runActions(action) {
      if (_.isFunction(action)) {
        return action(cluck);
      }
      if (_.isString(action)) {
        return runTaskNamed(action);
      }
    }
  }
}

module.exports = TaskRunner;
