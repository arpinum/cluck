'use strict';

function CluckTasks() {
  var tasks = {};
  var self = this;
  self.put = put;
  self.get = get;

  function put(name, task) {
    tasks[name] = task;
  }

  function get(name) {
    return tasks[name];
  }
}

module.exports = CluckTasks;
