'use strict';

var _ = require('lodash');
var TaskRunner = require('../../task/TaskRunner');

function Tasks(cluck) {
  var self = this;
  self.run = run;

  function run() {
    var taskRunner = new TaskRunner(cluck);
    return taskRunner.run(_.toArray(arguments));
  }
}

module.exports = Tasks;
