'use strict';

var _ = require('lodash');

function Registration(cluck, taskName) {
  var self = this;
  self.doing = doing;
  self.withTask = withTask;
  cluck.tasks[taskName] = {actions: []};

  function doing() {
    _.forEach(arguments, function (action) {
      cluck.tasks[taskName].actions.push(action);
    });
    return self;
  }

  function withTask(name) {
    return cluck.withTask(name);
  }
}

module.exports = Registration;
