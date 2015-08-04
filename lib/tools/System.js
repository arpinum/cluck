'use strict';

var _ = require('lodash');
var path = require('path');

function System() {
  var self = this;
  self.clearCache = clearCache;

  function clearCache(files) {
    if (files) {
      clearCacheForFiles(files);
    } else {
      clearAllCache();
    }
  }

  function clearCacheForFiles(files) {
    _.forEach(files, function (file) {
      delete require.cache[path.resolve(file)];
    });
  }

  function clearAllCache() {
    _.forOwn(require.cache, function (value, key) {
      delete require.cache[key];
    });
  }
}

module.exports = System;
