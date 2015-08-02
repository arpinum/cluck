'use strict';

require('chai').should();
var _ = require('lodash');
var TaskRunner = require('./TasksRunner');

describe('The task runner', function () {

  var drunk;
  var taskRunner;

  beforeEach(function () {
    drunk = {tasks: [], log: {info: _.noop}};
    taskRunner = new TaskRunner();
  });

  it('should run given tasks', function () {
    var tasksRun = [];
    drunk.tasks.first = {
      actions: [function () {
        tasksRun.push('first task');
      }]
    };
    drunk.tasks.second = {
      actions: [function () {
        tasksRun.push('second task');
      }]
    };

    return taskRunner.run(drunk, ['first', 'second']).then(function () {
      tasksRun.should.deep.equal(['first task', 'second task']);
    });
  });
});
