'use strict';

require('chai').should();
var Cluck = require('../Cluck');
var Tasks = require('./Tasks');

describe('Tasks', function () {

  var cluck;
  var tasks;
  var tasksRun;

  beforeEach(function () {
    cluck = new Cluck({});
    tasks = new Tasks(cluck);
    tasksRun = [];
  });

  it('should run various tasks', function () {
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

    return tasks.run('first', 'second').then(function () {
      tasksRun.should.deep.equal(['first task', 'second task']);
    });
  });
});
