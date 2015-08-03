'use strict';

var should = require('chai').should();
var path = require('path');
var CluckLoader = require('./CluckLoader');

describe('The cluck loader', function () {

  var cluckLoader;
  var oldCwd;

  beforeEach(function () {
    cluckLoader = new CluckLoader();
    oldCwd = process.cwd();
  });

  afterEach(function () {
    process.chdir(oldCwd);
  });

  it('should read Cluckfile to register tasks', function () {
    process.chdir(path.join(__dirname, 'test', 'simple'));

    var cluck = cluckLoader.load();

    should.exist(cluck);
    should.exist(cluck.tasks.task);
  });

  it('should read the closest Cluckfile in parent folders', function () {
    process.chdir(path.join(__dirname, 'test', 'deep', 'd', 'e', 'e', 'p'));

    var cluck = cluckLoader.load();

    should.exist(cluck);
    should.exist(cluck.tasks.task);
    should.not.exist(cluck.tasks.wrongtask);
  });
});
