'use strict';

var should = require('chai').should();
var Drunk = require('./Drunk');

describe('Drunk', function () {

  var drunk;

  beforeEach(function () {
    drunk = new Drunk();
  });

  it('should find and register tasks with a given pattern', function () {
    drunk.runTasks = [];

    drunk.findAndRegisterTasks(__dirname + '/test/pattern/**/*.js');

    should.exist(drunk.tasks.firstTask);
    runAction(drunk.tasks.firstTask);
    should.exist(drunk.tasks.secondTask);
    runAction(drunk.tasks.secondTask);
    drunk.runTasks.should.deep.equal(['first task', 'second task']);
  });

  function runAction(task) {
    task.actions[0](drunk);
  }
});
