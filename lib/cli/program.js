'use strict';

var program = require('commander');
var pkg = require('../../package.json');
var DrunkLoader = require('../DrunkLoader');
var TasksRunner = require('../task/TasksRunner');

function Program() {
  this.execute = execute;

  function execute() {
    program
      .version(pkg.version)
      .description('run one or more tasks')
      .usage('[options] <task1 task2 ...>')
      .parse(process.argv);

    var drunk = new DrunkLoader().load();
    new TasksRunner(drunk).promiseRun(program.args);
  }
}

module.exports = Program;
