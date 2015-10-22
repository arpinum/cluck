'use strict';

var Bluebird = require('bluebird');
var path = require('path');
var fs = Bluebird.promisifyAll(require('fs-extra'));

function Files() {
  var self = this;
  self.glob = Bluebird.promisify(require('glob'));
  self.globAndCopyFiles = globAndCopyFiles;
  self.copyFiles = copyFiles;
  self.writeContent = writeContent;
  self.writeJson = writeJson;

  function globAndCopyFiles(globbing, destinationDirectory, options) {
    return self.glob(globbing.pattern, globbing.options).then(function (files) {
      return copyFiles(files, destinationDirectory, options);
    });
  }

  function copyFiles(filePaths, destinationDirectory, options) {
    options = options || {};
    return Bluebird.each(filePaths, function (filePath) {
      return copyFile(filePath, destinationDirectory);
    });

    function copyFile(filePath) {
      return fs.copyAsync(filePath, destinationPath(filePath));
    }

    function destinationPath(filePath) {
      return path.join(destinationDirectory, relativePath(filePath));
    }

    function relativePath(filePath) {
      if (options.preservePathAfter) {
        var fullBaseDirectoryPath = path.resolve(options.preservePathAfter);
        return path.relative(fullBaseDirectoryPath, filePath);
      }
      return path.basename(filePath);
    }
  }

  function writeContent(destination, content) {
    return fs.ensureFileAsync(destination)
      .then(function () {
        return fs.writeFileAsync(destination, content);
      });
  }

  function writeJson(destination, object) {
    return fs.ensureFileAsync(destination)
      .then(function () {
        return fs.writeJsonAsync(destination, object);
      });
  }
}

module.exports = Files;
