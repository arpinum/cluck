'use strict';

require('chai').should();
var TaskRunner = require('./TasksRunner');


describe('The task runner', function () {

  var drunk;
  var taskRunner;

  beforeEach(function () {
    drunk = {tasks: []};
    taskRunner = new TaskRunner(drunk);
  });

  it('should run given tasks', function () {
    var tasksRun = [];
    drunk.tasks.first = {
      action: function () {
        tasksRun.push('first task');
      }
    };
    drunk.tasks.second = {
      action: function () {
        tasksRun.push('second task');
      }
    };

    return taskRunner.run(['first', 'second']).then(function () {
      tasksRun.should.deep.equal(['first task', 'second task']);
    });
  });
});
