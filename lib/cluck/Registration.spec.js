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

    var myTask = cluck._tasks.get('myTask');
    should.exist(myTask);
    should.exist(myTask.actions);
    myTask.actions.should.deep.equal(['action']);
  });

  it('should register a task doing several actions', function () {
    cluck.withTask('myTask').doing('action1', 'action2');

    cluck._tasks.get('myTask').actions.should.deep.equal(['action1', 'action2']);
  });

  it('should register a task doing several actions fluently', function () {
    cluck.withTask('myTask').doing('action1').doing('action2');

    cluck._tasks.get('myTask').actions.should.deep.equal(['action1', 'action2']);
  });

  it('should register several tasks fluently', function () {
    cluck
      .withTask('task1').doing('action1')
      .withTask('task2').doing('action2');

    var task1 = cluck._tasks.get('task1');
    should.exist(task1);
    task1.actions.should.deep.equal(['action1']);
    var task2 = cluck._tasks.get('task2');
    should.exist(task2);
    task2.actions.should.deep.equal(['action2']);
  });
});
