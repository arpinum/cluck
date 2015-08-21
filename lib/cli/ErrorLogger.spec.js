'use strict';

require('chai').use(require('sinon-chai')).should();
var sinon = require('sinon');
var ErrorLogger = require('./ErrorLogger');

describe('The error logger', function () {

  var logger;
  var errorLogger;

  beforeEach(function () {
    logger = {error: sinon.stub()};
    errorLogger = new ErrorLogger(logger);
  });

  it('should log with error message if any', function () {
    errorLogger.log(new Error('the message'), {});

    logger.error.should.have.been.calledWith('Something went wrong: the message');
  });

  it('should log a generic message when no error is given', function () {
    errorLogger.log(null, {});

    logger.error.should.have.been.calledWith('Something went wrong');
  });

  it('should log a generic message when error does not have any message', function () {
    errorLogger.log(new Error(), {});

    logger.error.should.have.been.calledWith('Something went wrong');
  });

  it('should log with stacktrace if any and stack is wanted', function () {
    var error = new Error();
    error.stack = 'the stacktrace';

    errorLogger.log(error, {stack: true});

    logger.error.should.have.been.calledWith('Something went wrong');
    logger.error.should.have.been.calledWith('the stacktrace');
  });

  it('should log without stacktrace if stack is not wanted', function () {
    var error = new Error();
    error.stack = 'the stacktrace';

    errorLogger.log(error, {stack: false});

    logger.error.should.not.have.been.calledWith('the stacktrace');
  });

  it('should log without stacktrace if error does not have any stack', function () {
    var error = new Error();
    error.stack = null;

    errorLogger.log(error, {stack: true});

    logger.error.should.have.been.calledOnce;
    logger.error.should.have.been.calledWith('Something went wrong');
  });

  it('should log without stacktrace when no error is given', function () {
    errorLogger.log(null, {stack: true});

    logger.error.should.have.been.calledOnce;
    logger.error.should.have.been.calledWith('Something went wrong');
  });
});
