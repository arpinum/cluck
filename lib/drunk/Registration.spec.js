'use strict';

var should = require('chai').should();
var Drunk = require('./Drunk');

describe('The registration', function () {

  var drunk;

  beforeEach(function () {
    drunk = new Drunk({});
  });

  it('should register a task doing one action', function () {
    drunk.withTask('myTask').doing('action');

    drunk.tasks.should.not.be.empty;
    should.exist(drunk.tasks.myTask);
    should.exist(drunk.tasks.myTask.actions);
    drunk.tasks.myTask.actions.should.deep.equal(['action']);
  });

  it('should register a task doing several actions', function () {
    drunk.withTask('myTask').doing('action1', 'action2');

    drunk.tasks.myTask.actions.should.deep.equal(['action1', 'action2']);
  });

  it('should register a task doing several actions fluently', function () {
    drunk.withTask('myTask').doing('action1').doing('action2');

    drunk.tasks.myTask.actions.should.deep.equal(['action1', 'action2']);
  });

  it('should register several tasks fluently', function () {
    drunk
      .withTask('task1').doing('action1')
      .withTask('task2').doing('action2');

    should.exist(drunk.tasks.task1);
    drunk.tasks.task1.actions.should.deep.equal(['action1']);
    should.exist(drunk.tasks.task2);
    drunk.tasks.task2.actions.should.deep.equal(['action2']);
  });
});
