'use strict';

var Bluebird = require('bluebird');

function Files() {
  var self = this;
  self.glob = Bluebird.promisify(require('glob'));
}

module.exports = Files;
