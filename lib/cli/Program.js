'use strict';

var _ = require('lodash');
var Bluebird = require('bluebird');
var Command = require('commander').Command;
var pkg = require('../../package.json');
var CluckLoader = require('../cluck/CluckLoader');
var TaskRunner = require('../task/TaskRunner');
var Configuration = require('../tools/Configuration');

function Program() {
  this.execute = execute;

  function execute(options) {
    var theOptions = optionsInitialized(options);
    var logger = theOptions.console;

    return Bluebird.try(function () {
      return loadAndRunTasks(theOptions);
    }).catch(function (error) {
      logError(error);
      theOptions.process.exit(1);
    });

    function optionsInitialized(options) {
      return _.defaults(options || {}, {
        process: process,
        console: console
      });
    }

    function loadAndRunTasks(options) {
      var command = commandInitialized();
      var configuration = configurationInitialized(command);
      var cluck = new CluckLoader().load(configuration);
      logger = cluck.log;
      return new TaskRunner(cluck).run(command.args);

      function commandInitialized() {
        var command = new Command()
          .version(pkg.version)
          .description('run one or more tasks')
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

    function logError(error) {
      var message = 'Something went wrong';
      if (error && error.message) {
        message += ': ' + error.message;
      }
      logger.error(message);
    }
  }
}

module.exports = Program;
