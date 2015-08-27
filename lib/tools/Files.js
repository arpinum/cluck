'use strict';

var Bluebird = require('bluebird');
var path = require('path');
var fs = Bluebird.promisifyAll(require('fs-extra'));

function Files() {
  var self = this;
  self.glob = Bluebird.promisify(require('glob'));
  self.copy = copy;
  self.writeJson = writeJson;

  function copy(files, baseDirectory, destinationDirectory) {
    return Bluebird.each(files, function (file) {
      return copyFile(file, baseDirectory, destinationDirectory);
    });
  }

  function copyFile(file, baseDirectory, destinationDirectory) {
    var fullBaseDirectoryPath = path.resolve(baseDirectory);
    var relativePath = path.relative(fullBaseDirectoryPath, file);
    var destinationPath = path.join(destinationDirectory, relativePath);
    return fs.copyAsync(file, destinationPath);
  }

  function writeJson(destination, object) {
    return fs.ensureFileAsync(destination)
      .then(function () {
        return fs.writeJsonAsync(destination, object);
      });
  }
}

module.exports = Files;
