'use strict';

require('chai').should();
var Cluck = require('./Cluck');

describe('Cluck', function () {

  var cluck;

  beforeEach(function () {
    cluck = new Cluck();
  });

  it('should find and register tasks with a given pattern', function () {
    cluck.runTasks = [];

    cluck.findAndRegisterTasks(__dirname + '/test/pattern/**/*.js');

    return cluck.tasks.run('firstTask', 'secondTask').then(function () {
      cluck.runTasks.should.deep.equal(['first task', 'second task']);
    });
  });

  it('should find and register tasks though their filenames contains special characters', function () {
    cluck.runTasks = [];

    cluck.findAndRegisterTasks(__dirname + '/test/specialCharacters/**/*.js');

    return cluck.tasks.run('prépare', 'with space').then(function () {
      cluck.runTasks.should.deep.equal(['prépare task', 'with space task']);
    });
  });
});
