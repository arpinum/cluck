'use strict';

var _ = require('lodash');
var unorm = require('unorm');
var path = require('path');
var glob = require('glob');
var Registration = require('./Registration');
var CluckTasks = require('./CluckTasks');

function Cluck(configuration) {
  var self = this;
  self._tasks = new CluckTasks();
  self.withTask = withTask;
  self.findAndRegisterTasks = findAndRegisterTasks;
  self.configuration = configuration || {};
  self.log = new (require('./../tools/Log'))(self.configuration);
  self.shell = new (require('./../tools/Shell'))();
  self.files = new (require('./../tools/Files'))();
  self.tasks = new (require('./facades/Tasks'))(self);
  self.system = new (require('./../tools/System'))();

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
