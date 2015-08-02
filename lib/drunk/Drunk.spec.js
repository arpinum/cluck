'use strict';

var should = require('chai').should();
var Drunk = require('./Drunk');

describe('Drunk', function () {

  var drunk;

  beforeEach(function () {
    drunk = new Drunk();
  });

  it('should register task defined with a name and function', function () {
    var called;

    drunk.registerTask('my task', function () {
      called = true;
    });

    should.exist(drunk.tasks['my task']);
    runAction(drunk.tasks['my task']);
    called.should.be.true;
  });

  it('should register task defined with a name and several other tasks', function () {
    drunk.registerTask('other 1', function () {
    });
    drunk.registerTask('other 2', function () {
    });

    drunk.registerTask('my task', ['other 1', 'other 2']);

    should.exist(drunk.tasks['my task']);
    drunk.tasks['my task'].actions.should.deep.equal(['other 1', 'other 2']);
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
