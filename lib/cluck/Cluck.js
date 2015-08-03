'use strict';

var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var Registration = require('./Registration');

function Cluck(configuration) {
  var self = this;
  self.tasks = {};
  self.withTask = withTask;
  self.findAndRegisterTasks = findAndRegisterTasks;
  self.configuration = configuration || {};
  self.log = new (require('./../tools/Log'))(self.configuration);
  self.shell = new (require('./../tools/Shell'))();
  self.files = new (require('./../tools/Files'))();

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
    return path.basename(file, path.extname(file));
  }
}

module.exports = Cluck;
