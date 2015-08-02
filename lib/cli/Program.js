'use strict';

var _ = require('lodash');
var Bluebird = require('bluebird');
var Command = require('commander').Command;
var pkg = require('../../package.json');
var DrunkLoader = require('../drunk/DrunkLoader');
var TasksRunner = require('../task/TasksRunner');
var Configuration = require('../tools/Configuration');

function Program() {
  this.execute = execute;

  function execute(options) {
    var theOptions = optionsInitialized(options);
    var logger = theOptions.console;
    return Bluebird.resolve()
      .then(_.partial(loadAndRunTasks, theOptions))
      .catch(function (error) {
        logger.error('Something went wrong:\n', error);
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
      var drunk = new DrunkLoader().load(configuration);
      logger = drunk.log;
      return new TasksRunner().run(drunk, command.args);

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
  }
}

module.exports = Program;
