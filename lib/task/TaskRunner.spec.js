'use strict';

require('chai').should();
var _ = require('lodash');
var TaskRunner = require('./TasksRunner');

describe('The task runner', function () {

  var cluck;
  var taskRunner;

  beforeEach(function () {
    cluck = {tasks: [], log: {info: _.noop}};
    taskRunner = new TaskRunner();
  });

  it('should run given tasks', function () {
    var tasksRun = [];
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
});
