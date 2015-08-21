'use strict';

require('chai').use(require('sinon-chai')).should();
var sinon = require('sinon');
var ErrorLogger = require('./ErrorLogger');

describe('The error logger', function () {

  var logger;
  var configuration;
  var errorLogger;

  beforeEach(function () {
    logger = {error: sinon.stub()};
    configuration = {};
    errorLogger = new ErrorLogger(logger, configuration);
  });

  it('should log with error message if any', function () {
    errorLogger.log(new Error('the message'));

    logger.error.should.have.been.calledWith('Something went wrong: the message');
  });

  it('should log a generic message when no error is given', function () {
    errorLogger.log(null);

    logger.error.should.have.been.calledWith('Something went wrong');
  });

  it('should log a generic message when error does not have any message', function () {
    errorLogger.log(new Error());

    logger.error.should.have.been.calledWith('Something went wrong');
  });

  it('should log with stacktrace if any and stack is wanted', function () {
    var error = new Error();
    error.stack = 'the stacktrace';
    configuration.stack = true;

    errorLogger.log(error);

    logger.error.should.have.been.calledWith('Something went wrong');
    logger.error.should.have.been.calledWith('the stacktrace');
  });

  it('should log without stacktrace if stack is not wanted', function () {
    var error = new Error();
    error.stack = 'the stacktrace';

    errorLogger.log(error);

    logger.error.should.not.have.been.calledWith('the stacktrace');
  });

  it('should log without stacktrace if error does not have any stack', function () {
    var error = new Error();
    error.stack = null;
    configuration.stack = true;

    errorLogger.log(error);

    logger.error.should.have.been.calledOnce;
    logger.error.should.have.been.calledWith('Something went wrong');
  });

  it('should log without stacktrace when no error is given', function () {
    configuration.stack = true;

    errorLogger.log(null);

    logger.error.should.have.been.calledOnce;
    logger.error.should.have.been.calledWith('Something went wrong');
  });
});
