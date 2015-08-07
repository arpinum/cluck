'use strict';

require('chai').use(require('chai-as-promised')).should();
var TaskRunner = require('./TaskRunner');
var Cluck = require('../cluck/Cluck');

describe('The task runner', function () {

  var cluck;
  var taskRunner;
  var tasksRun;

  beforeEach(function () {
    cluck = new Cluck();
    taskRunner = new TaskRunner(cluck);
    tasksRun = [];
  });

  it('should run given tasks', function () {
    cluck._tasks.put('first', {
      actions: [function () {
        tasksRun.push('first task');
      }]
    });
    cluck._tasks.put('second', {
      actions: [function () {
        tasksRun.push('second task');
      }]
    });

    return taskRunner.run(['first', 'second']).then(function () {
      tasksRun.should.deep.equal(['first task', 'second task']);
    });
  });

  it('should run default task if no tasks are given', function () {
    cluck._tasks.put('default', {
      actions: [function () {
        tasksRun.push('default task');
      }]
    });

    return taskRunner.run([]).then(function () {
      tasksRun.should.deep.equal(['default task']);
    });
  });

  it('should reject if task is unknown', function () {
    return taskRunner.run(['unknown']).should.eventually.be.rejectedWith('The "unknown" task is unknown');
  });
});
