'use strict';

require('chai').should();
var Log = require('./Log');

describe('The log', function () {

  it('should throw an error if the level defined in configuration is unknown', function () {
    var configuration = {logLevel: 'unknown'};

    var creation = function () {
      /*eslint no-new: 0*/
      new Log(configuration);
    };

    creation.should.throw('The log level "unknown" is unknown. Level must be in');
  });
});
