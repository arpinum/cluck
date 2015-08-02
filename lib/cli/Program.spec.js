'use strict';

require('chai').should();
var _ = require('lodash');
var path = require('path');
var Program = require('./Program');

describe('The program', function () {

  var program;
  var oldCwd;
  var theConsole;

  beforeEach(function () {
    program = new Program();
    oldCwd = process.cwd();
    theConsole = {error: _.noop};
  });

  afterEach(function () {
    process.chdir(oldCwd);
  });

  it('should parse process args and run corresponding tasks', function () {
    process.chdir(path.join(__dirname, 'test', 'simple'));
    var theProcess = {argv: createArgs('first', 'second')};

    var promise = program.execute({process: theProcess});

    return promise.then(function () {
      global.tasksRun.should.deep.equal(['first task', 'second task']);
    });
  });

  it('should exit process as failure if there is any rejection during the run', function () {
    var exitCode;
    process.chdir(path.join(__dirname, 'test', 'error'));
    var theProcess = {
      argv: createArgs('task'),
      exit: function (code) {
        exitCode = code;
      }
    };

    var promise = program.execute({process: theProcess});

    return promise.then(function () {
      exitCode.should.equal(1);
    });
  });

  it('should exit process as failure if there is any error during initialization', function () {
    var exitCode;
    process.chdir(path.join(__dirname, 'test', 'simple'));
    var theProcess = {
      argv: ['', '', '-l', 'unknown', 'first'],
      exit: function (code) {
        exitCode = code;
      }
    };

    var promise = program.execute({process: theProcess, console: theConsole});

    return promise.then(function () {
      exitCode.should.equal(1);
    });
  });

  function createArgs() {
    return _.flatten(['', '', '-l', 'off', arguments]);
  }
});
