'use strict';

module.exports = function (drunk) {
  drunk.registerTask('task1', function () {
    console.log('I am task1');
  });

  drunk.registerTask('task2', function () {
    console.log('I am task2');
  });

  function task3() {
    console.log('I am task3');
  }

  drunk.registerTask('default', ['task1', 'task2', task3]);
};
