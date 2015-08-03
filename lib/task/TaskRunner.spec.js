'use strict';

require('chai').should();
var _ = require('lodash');
var TaskRunner = require('./TasksRunner');

describe('The task runner', function () {

  var cluck;
  var taskRunner;
  var tasksRun;

  beforeEach(function () {
    cluck = {tasks: [], log: {info: _.noop}};
    taskRunner = new TaskRunner();
    tasksRun = [];
  });

  it('should run given tasks', function () {
    cluck.tasks.first = {
      actions: [function () {
        tasksRun.push('first task');
      }]
    };
    cluck.tasks.second = {
      actions: [function () {
        tasksRun.push('second task');
      }]
    };

    return taskRunner.run(cluck, ['first', 'second']).then(function () {
      tasksRun.should.deep.equal(['first task', 'second task']);
    });
  });

  it('should run default task if no tasks are given', function () {
    cluck.tasks.default = {
      actions: [function () {
        tasksRun.push('default task');
      }]
    };

    return taskRunner.run(cluck, []).then(function () {
      tasksRun.should.deep.equal(['default task']);
    });
  });
});
