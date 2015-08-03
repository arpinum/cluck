'use strict';

module.exports = function (cluck) {
  cluck.withTask('task1').doing(function () {
    console.log('I am task1');
  });

  cluck.withTask('task2').doing(function () {
    console.log('I am task2');
  });

  function task3() {
    console.log('I am task3');
  }

  cluck.withTask('default').doing('task1', 'task2', task3);
};
