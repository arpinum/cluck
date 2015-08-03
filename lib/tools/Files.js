'use strict';

var Bluebird = require('bluebird');
var path = require('path');
var fsCopy = Bluebird.promisify(require('fs-extra').copy);

function Files() {
  var self = this;
  self.glob = Bluebird.promisify(require('glob'));
  self.copy = copy;

  function copy(files, baseDirectory, destinationDirectory) {
    return Bluebird.each(files, function (file) {
      return copyFile(file, baseDirectory, destinationDirectory);
    });
  }

  function copyFile(file, baseDirectory, destinationDirectory) {
    var fullBaseDirectoryPath = path.resolve(baseDirectory);
    var relativePath = path.relative(fullBaseDirectoryPath, file);
    var destinationPath = path.join(destinationDirectory, relativePath);
    return fsCopy(file, destinationPath);
  }
}

module.exports = Files;
