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

  function execute(options) {
    var theOptions = optionsInitialized(options);
    var logger = theOptions.console;
    var command;

    return Bluebird.try(function () {
      return loadAndRunTasks(theOptions);
    }).catch(function (error) {
      new ErrorLogger(logger).log(error, command);
      theOptions.process.exit(1);
    });

    function optionsInitialized(options) {
      return _.defaults(options || {}, {
        process: process,
        console: console
      });
    }

    function loadAndRunTasks(options) {
      command = commandInitialized();
      var configuration = configurationInitialized(command);
      var cluck = new CluckLoader().load(configuration);
      logger = cluck.log;
      return new TaskRunner(cluck).run(command.args);

      function commandInitialized() {
        var command = new Command()
          .version(pkg.version)
          .description('run one or more tasks')
          .option('--stack', 'Print unhandled error stacktrace')
          .usage('[options] <task1 task2 ...>');
        commandWithLogLevelOption(command);
        return command.parse(options.process.argv);
      }

      function commandWithLogLevelOption(command) {
        return command.option(
          '-l, --log-level <level>',
          'define the log level (e.g. info, warn, error, off)');
      }

      function configurationInitialized(command) {
        return new Configuration(command);
      }
    }
  }
}

module.exports = Program;
