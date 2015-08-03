'use strict';

var should = require('chai').should();
var Cluck = require('./Cluck');

describe('The registration', function () {

  var cluck;

  beforeEach(function () {
    cluck = new Cluck({});
  });

  it('should register a task doing one action', function () {
    cluck.withTask('myTask').doing('action');

    cluck.tasks.should.not.be.empty;
    should.exist(cluck.tasks.myTask);
    should.exist(cluck.tasks.myTask.actions);
    cluck.tasks.myTask.actions.should.deep.equal(['action']);
  });

  it('should register a task doing several actions', function () {
    cluck.withTask('myTask').doing('action1', 'action2');

    cluck.tasks.myTask.actions.should.deep.equal(['action1', 'action2']);
  });

  it('should register a task doing several actions fluently', function () {
    cluck.withTask('myTask').doing('action1').doing('action2');

    cluck.tasks.myTask.actions.should.deep.equal(['action1', 'action2']);
  });

  it('should register several tasks fluently', function () {
    cluck
      .withTask('task1').doing('action1')
      .withTask('task2').doing('action2');

    should.exist(cluck.tasks.task1);
    cluck.tasks.task1.actions.should.deep.equal(['action1']);
    should.exist(cluck.tasks.task2);
    cluck.tasks.task2.actions.should.deep.equal(['action2']);
  });
});
