'use strict';

require('chai').should();
var Drunk = require('./Drunk');

describe('Drunk', function () {

  var drunk;

  beforeEach(function () {
    drunk = new Drunk();
  });

  it('should register task defined with a name and function', function () {
    var called;
    drunk.register('my task', function () {
      called = true;
    });

    drunk.tasks['my task'].action();

    called.should.be.true;
  });
});
