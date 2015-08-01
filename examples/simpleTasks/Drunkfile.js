'use strict';

module.exports = function (drunk) {
  drunk.registerTask('task1', function () {
    console.log('I am task1');
  });

  drunk.registerTask('task2', function () {
    console.log('I am task2');
  });
};
