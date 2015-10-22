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

  it('should copy files in the destination directory', function () {
    var sourceFiles = [
      resolvePath('the/base/directory/a/b/c/file1.txt'),
      resolvePath('the/base/directory/file2.txt')
    ];
    fs.ensureFileSync(sourceFiles[0]);
    fs.ensureFileSync(sourceFiles[1]);

    var promise = files.copyFiles(
      sourceFiles,
      resolvePath('the/destination/directory')
    );

    return promise.then(function () {
      fileExists('the/destination/directory/file1.txt').should.be.true;
      fileExists('the/destination/directory/file2.txt').should.be.true;
    });
  });

  it('should copy files preserving the path after the one given in option', function () {
    var sourceFiles = [
      resolvePath('the/base/directory/a/b/c/file1.txt'),
      resolvePath('the/base/directory/file2.txt')
    ];
    fs.ensureFileSync(sourceFiles[0]);
    fs.ensureFileSync(sourceFiles[1]);

    var promise = files.copyFiles(
      sourceFiles,
      resolvePath('the/destination/directory'),
      {preservePathAfter: resolvePath('the/base/directory')}
    );

    return promise.then(function () {
      fileExists('the/destination/directory/a/b/c/file1.txt').should.be.true;
      fileExists('the/destination/directory/file2.txt').should.be.true;
    });
  });

  it('should glob and copy files in the destination directory preserving all paths but base directory', function () {
    fs.ensureFileSync(resolvePath('the/base/directory/a/b/c/file1.txt'));
    fs.ensureFileSync(resolvePath('the/base/directory/file2.txt'));
    var globbing = {pattern: resolvePath('the/base/directory') + '/**/*.txt', options: {}};

    var promise = files.globAndCopyFiles(
      globbing,
      resolvePath('the/destination/directory'),
      {preservePathAfter: resolvePath('the/base/directory')}
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
      var readObject = fs.readJsonSync(resolvePath('the/destination/file.json'));
      readObject.should.deep.equal(object);
    });
  });

  it('should write string content to file', function () {
    var content = 'the content';

    var promise = files.writeContent(resolvePath('the/destination/file.txt'), content);

    return promise.then(function () {
      fileExists('the/destination/file.txt').should.be.true;
      var readContent = fs.readFileSync(resolvePath('the/destination/file.txt'), {encoding: 'utf-8'});
      readContent.should.deep.equal(content);
    });
  });

  function fileExists(path) {
    return fs.statSync(resolvePath(path)).isFile();
  }

  function resolvePath(relativePath) {
    return path.resolve(tempDirectory, relativePath);
  }
});
