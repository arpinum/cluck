'use strict';

var findup = require('findup-sync');
var Cluck = require('./Cluck');

function CluckLoader() {
  this.load = load;

  function load(configuration) {
    var cluck = new Cluck(configuration);
    var cluckfile = findup('Cluckfile.js', {nocase: true});
    require(cluckfile)(cluck);
    return cluck;
  }
}

module.exports = CluckLoader;
