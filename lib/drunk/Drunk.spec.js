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
    drunk.tasks['my task'].action();
    called.should.be.true;
  });

  it('should find and register tasks with a given pattern', function () {
    drunk.runTasks = [];

    drunk.findAndRegisterTasks(__dirname + '/test/pattern/**/*.js');

    should.exist(drunk.tasks.firstTask);
    drunk.tasks.firstTask.action(drunk);
    should.exist(drunk.tasks.secondTask);
    drunk.tasks.secondTask.action(drunk);
    drunk.runTasks.should.deep.equal(['first task', 'second task']);
  });
});
