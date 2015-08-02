'use strict';

var _ = require('lodash');
var program = require('commander');
var pkg = require('../../package.json');
var DrunkLoader = require('../drunk/DrunkLoader');
var TasksRunner = require('../task/TasksRunner');

function Program() {
  this.execute = execute;

  function execute(options) {
    var theOptions = initializeOptions(options);
    program
      .version(pkg.version)
      .description('run one or more tasks')
      .usage('[options] <task1 task2 ...>')
      .parse(theOptions.process.argv);

    var drunk = new DrunkLoader().load();
    return new TasksRunner(drunk).run(program.args);
  }

  function initializeOptions(options) {
    return _.defaults(options || {}, {process: process});
  }
}

module.exports = Program;
