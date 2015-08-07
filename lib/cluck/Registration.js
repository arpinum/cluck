'use strict';

var _ = require('lodash');

function Registration(cluck, taskName) {
  var self = this;
  self.doing = doing;
  self.withTask = withTask;

  function doing() {
    var actions = _.toArray(arguments);
    var existing = cluck._tasks.get(taskName);
    if (existing) {
      existing.actions = existing.actions.concat(actions);
    } else {
      cluck._tasks.put(taskName, {actions: actions});
    }
    return self;
  }

  function withTask(name) {
    return cluck.withTask(name);
  }
}

module.exports = Registration;
