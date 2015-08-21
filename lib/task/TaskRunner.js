'use strict';

var _ = require('lodash');
var _s = require('underscore.string');
var Bluebird = require('bluebird');
var RunLogger = require('./RunLogger');

function TaskRunner(cluck) {
  this.run = run;

  function run(taskNames) {
    var theTaskNames = _.isEmpty(taskNames) ? ['default'] : taskNames;
    return Bluebird.each(theTaskNames, runTaskNamed, {concurrency: 1});

    function runTaskNamed(name) {
      checkTaskExistance(name);
      var runLogger = new RunLogger(cluck, name);
      runLogger.runStarted();
      var task = cluck._tasks.get(name);
      return runActions(task).then(function () {
        runLogger.runEnded();
      });
    }

    function checkTaskExistance(name) {
      if (_.isUndefined(cluck._tasks.get(name))) {
        throw new Error(_s.sprintf('The "%s" task is unknown', name));
      }
    }

    function runActions(task) {
      return Bluebird.each(task.actions, runAction, {concurrency: 1});
    }

    function runAction(action) {
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
