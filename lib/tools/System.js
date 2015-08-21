'use strict';

var _ = require('lodash');

function System() {
  var self = this;
  self.clearCache = clearCache;

  function clearCache(regex) {
    var theRegex = regex || /.*/;
    _.forOwn(require.cache, function (value, key) {
      if (theRegex.test(key)) {
        delete require.cache[key];
      }
    });
  }
}

module.exports = System;
