'use strict';

module.exports = function (drunk) {
  drunk.register('task1', function () {
    console.log('I am task1');
  });

  drunk.register('task2', function () {
    console.log('I am task2');
  });
};
