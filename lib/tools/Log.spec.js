'use strict';

require('chai').should();
var Log = require('./Log');

describe('The log', function () {

  it('should throw an error if the level defined in configuration is unknown', function () {
    var configuration = {logLevel: 'unknown'};
    var log;

    var creation = function () {
      log = new Log(configuration);
    };

    creation.should.throw('The log level "unknown" is unknown. Level must be in');
  });
});
