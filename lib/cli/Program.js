'use strict';

var _ = require('lodash');
var Bluebird = require('bluebird');
var Command = require('commander').Command;
var pkg = require('../../package.json');
var CluckLoader = require('../cluck/CluckLoader');
var TaskRunner = require('../task/TaskRunner');
var Configuration = require('../tools/Configuration');
var ErrorLogger = require('./ErrorLogger');

function Program() {
  this.execute = execute;

  function execute(opts) {
    var options = optionsInitialized();
    var configuration = Configuration.default();
    var cluck;

    return Bluebird.try(function () {
      var command = commandInitialized();
      configuration = Configuration.from(command);
      return loadAndRunTasks(command);
    }).catch(function (error) {
      new ErrorLogger(logger(), configuration).log(error);
      options.process.exit(1);
    });

    function optionsInitialized() {
      return _.defaults(opts || {}, {
        process: process,
        console: console
      });
    }

    function loadAndRunTasks(command) {
      cluck = new CluckLoader().load(configuration);
      return new TaskRunner(cluck).run(command.args);
    }

    function commandInitialized() {
      var command = new Command()
      .version(pkg.version)
      .description('run one or more tasks')
      .usage('[options] <task1 task2 ...>');
      commandWithLogLevelOption(command);
      commandWithStackOption(command);
      commandWithStatsOption(command);
      return command.parse(options.process.argv);
    }

    function commandWithLogLevelOption(command) {
      return command.option('-l, --log-level <level>', 'define the log level (e.g. info, warn, error, off)');
    }

    function commandWithStackOption(command) {
      return command.option('--stack', 'output any unhandled error stacktrace');
    }

    function commandWithStatsOption(command) {
      return command.option('--stats', 'output informations about task run');
    }

    function logger() {
      return cluck ? cluck.log : options.console;
    }
  }
}

module.exports = Program;
