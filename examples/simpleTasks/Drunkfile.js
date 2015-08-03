'use strict';

module.exports = function (drunk) {
  drunk.withTask('task1').doing(function () {
    console.log('I am task1');
  });

  drunk.withTask('task2').doing(function () {
    console.log('I am task2');
  });

  function task3() {
    console.log('I am task3');
  }

  drunk.withTask('default').doing('task1', 'task2', task3);
};
