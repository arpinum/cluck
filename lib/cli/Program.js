'use strict';

var _ = require('lodash');
var program = require('commander');
var pkg = require('../../package.json');
var DrunkLoader = require('../drunk/DrunkLoader');
var TasksRunner = require('../task/TasksRunner');

function Program() {
  this.execute = execute;

  function execute(options) {
    var theOptions = optionsInitialized(options);
    initializeProgram();
    return run(new DrunkLoader().load());

    function optionsInitialized(options) {
      return _.defaults(options || {}, {process: process});
    }

    function initializeProgram() {
      program
        .version(pkg.version)
        .description('run one or more tasks')
        .usage('[options] <task1 task2 ...>')
        .parse(theOptions.process.argv);
    }

    function run(drunk) {
      return new TasksRunner(drunk).run(program.args)
        .catch(function () {
          theOptions.process.exit(1);
        });
    }
  }
}

module.exports = Program;
