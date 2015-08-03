'use strict';

var _ = require('lodash');

function Registration(drunk, taskName) {
  var self = this;
  self.doing = doing;
  self.withTask = withTask;
  drunk.tasks[taskName] = {actions: []};

  function doing() {
    _.forEach(arguments, function (action) {
      drunk.tasks[taskName].actions.push(action);
    });
    return self;
  }

  function withTask(name) {
    return drunk.withTask(name);
  }
}

module.exports = Registration;
