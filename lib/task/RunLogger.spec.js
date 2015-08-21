'use strict';

require('chai').use(require('sinon-chai')).should();
var _ = require('lodash');
var sinon = require('sinon');
var RunLogger = require('./RunLogger');

describe('The run logger', function () {

  var cluck;
  var runLogger;

  beforeEach(function () {
    cluck = {
      log: {
        info: sinon.stub()
      },
      configuration: {}
    };
    var options = {duration: _.constant(1337)};
    runLogger = new RunLogger(cluck, 'myTask', options);
  });

  it('should print a message when task starts', function () {
    runLogger.runStarted();

    cluck.log.info.should.have.been.calledWith('Running "myTask" task');
  });

  it('wont print anything when task ends if no stats are wanted', function () {
    runLogger.runEnded();

    cluck.log.info.should.not.have.been.called;
  });

  it('should print a message when task ends if stats are wanted', function () {
    cluck.configuration.stats = true;

    runLogger.runEnded();

    cluck.log.info.should.have.been.calledWith('Done running "myTask". Duration: 1337 ms');
  });
});
