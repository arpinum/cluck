'use strict';

require('chai').use(require('chai-as-promised')).should();
var temp = require('temp').track();
var path = require('path');
var Files = require('./Files');
var fs = require('fs-extra');

describe('Files', function () {

  var tempDirectory;
  var files;

  beforeEach(function () {
    tempDirectory = temp.mkdirSync();
    files = new Files();
  });

  afterEach(function () {
    temp.cleanupSync();
  });

  it('should return files corresponding to globbing pattern', function () {
    fs.ensureFileSync(resolvePath('a/b/c/file1.txt'));
    fs.ensureFileSync(resolvePath('file2.txt'));

    var promise = files.glob(tempDirectory + '/**/*.txt');

    var expected = [
      resolvePath('a/b/c/file1.txt'),
      resolvePath('file2.txt')
    ];
    return promise.should.eventually.deep.equal(expected);
  });

  it('should copy files in the destination directory preserving all paths but base directory', function () {
    var sourceFiles = [
      resolvePath('the/base/directory/a/b/c/file1.txt'),
      resolvePath('the/base/directory/file2.txt')
    ];
    fs.ensureFileSync(sourceFiles[0]);
    fs.ensureFileSync(sourceFiles[1]);

    var promise = files.copy(
      sourceFiles,
      resolvePath('the/base/directory'),
      resolvePath('the/destination/directory')
    );

    return promise.then(function () {
      fileExists('the/destination/directory/a/b/c/file1.txt').should.be.true;
      fileExists('the/destination/directory/file2.txt').should.be.true;
    });
  });

  it('should write object to json file', function () {
    var object = {the: 'object'};

    var promise = files.writeJson(resolvePath('the/destination/file.json'), object);

    return promise.then(function () {
      fileExists('the/destination/file.json').should.be.true;
      var content = fs.readJsonSync(resolvePath('the/destination/file.json'));
      content.should.deep.equal({the: 'object'});
    });
  });

  function fileExists(path) {
    return fs.statSync(resolvePath(path)).isFile();
  }

  function resolvePath(relativePath) {
    return path.resolve(tempDirectory, relativePath);
  }
});
