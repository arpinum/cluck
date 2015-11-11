'use strict';

var _ = require('lodash');
var unorm = require('unorm');
var path = require('path');
var glob = require('glob');
var building = require('building');
var Registration = require('./Registration');
var CluckTasks = require('./CluckTasks');

function Cluck(configuration) {
  var self = this;
  self._tasks = new CluckTasks();
  self.withTask = withTask;
  self.findAndRegisterTasks = findAndRegisterTasks;
  self.configuration = configuration || {};
  self.log = new (require('./../tools/Log'))(self.configuration);
  self.shell = building.shell;
  self.files = building.files;
  self.tasks = new (require('./facades/Tasks'))(self);

  function withTask(name) {
    return new Registration(self, name);
  }

  function findAndRegisterTasks(pattern) {
    var files = glob.sync(pattern);
    _.forEach(files, function (file) {
      var taskName = taskNameFrom(file);
      withTask(taskName).doing(require(path.resolve(file)));
    });
  }

  function taskNameFrom(file) {
    var name = path.basename(file, path.extname(file));
    return unorm.nfc(name);
  }
}

module.exports = Cluck;
