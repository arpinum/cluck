'use strict';

require('chai').should();
var path = require('path');
var Program = require('./Program');

describe('The program', function () {

  var program;
  var oldCwd;

  beforeEach(function () {
    program = new Program();
    oldCwd = process.cwd();
  });

  afterEach(function () {
    process.chdir(oldCwd);
  });

  it('should parse process args and run corresponding tasks', function () {
    process.chdir(path.join(__dirname, 'test', 'simple'));
    var theProcess = {argv: ['', '', 'first', 'second']};

    var promise = program.execute({process: theProcess});

    return promise.then(function () {
      global.tasksRun.should.deep.equal(['first task', 'second task']);
    });
  });
});
