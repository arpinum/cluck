'use strict';

var _ = require('lodash');
var path = require('path');
var glob = require('glob');

function Drunk() {
  var self = this;
  self.tasks = {};
  self.registerTask = registerTask;
  self.findAndRegisterTasks = findAndRegisterTasks;
  self.shell = new (require('./../tools/Shell'))();
  self.files = new (require('./../tools/Files'))();

  function registerTask(name, action) {
    self.tasks[name] = {action: action};
  }

  function findAndRegisterTasks(pattern) {
    var files = glob.sync(pattern);
    _.forEach(files, function (file) {
      var taskName = taskNameFrom(file);
      registerTask(taskName, require(path.resolve(file)));
    });
  }

  function taskNameFrom(file) {
    return path.basename(file, path.extname(file));
  }
}

module.exports = Drunk;
