'use strict';

var should = require('chai').should();
var Cluck = require('./Cluck');

describe('Cluck', function () {

  var cluck;

  beforeEach(function () {
    cluck = new Cluck();
  });

  it('should find and register tasks with a given pattern', function () {
    cluck.runTasks = [];

    cluck.findAndRegisterTasks(__dirname + '/test/pattern/**/*.js');

    should.exist(cluck.tasks.firstTask);
    runAction(cluck.tasks.firstTask);
    should.exist(cluck.tasks.secondTask);
    runAction(cluck.tasks.secondTask);
    cluck.runTasks.should.deep.equal(['first task', 'second task']);
  });

  function runAction(task) {
    task.actions[0](cluck);
  }
});
