'use strict';

var should = require('chai').should();
var path = require('path');
var DrunkLoader = require('./DrunkLoader');

describe('The drunk loader', function () {

  var drunkLoader;
  var oldCwd;

  beforeEach(function () {
    drunkLoader = new DrunkLoader();
    oldCwd = process.cwd();
  });

  afterEach(function () {
    process.chdir(oldCwd);
  });

  it('should read Drunkfile to register tasks', function () {
    process.chdir(path.join(__dirname, 'test', 'simple'));

    var drunk = drunkLoader.load();

    should.exist(drunk);
    should.exist(drunk.tasks.task);
  });

  it('should read the closest Drunkfile in parent folders', function () {
    process.chdir(path.join(__dirname, 'test', 'deep', 'd', 'e', 'e', 'p'));

    var drunk = drunkLoader.load();

    should.exist(drunk);
    should.exist(drunk.tasks.task);
    should.not.exist(drunk.tasks.wrongtask);
  });
});
