'use strict';

function Drunk() {
  var self = this;
  self.tasks = {};
  self.register = register;

  function register(name, action) {
    self.tasks[name] = {action: action};
  }
}

module.exports = Drunk;
