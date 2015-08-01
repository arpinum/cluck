'use strict';

var Shell = require('./tools/Shell');

function Drunk() {
  var self = this;
  self.tasks = {};
  self.register = register;
  self.shell = new Shell();

  function register(name, action) {
    self.tasks[name] = {action: action};
  }
}

module.exports = Drunk;
