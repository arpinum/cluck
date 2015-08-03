'use strict';

module.exports = function (drunk) {
  drunk.withTask('wrongtask').doing(function () {
  });
};
