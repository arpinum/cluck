'use strict';

var findup = require('findup-sync');
var Drunk = require('./Drunk');

function DrunkLoader() {
  this.load = load;

  function load() {
    var drunk = new Drunk();
    var drunkfile = findup('Drunkfile.js', {nocase: true});
    require(drunkfile)(drunk);
    return drunk;
  }
}

module.exports = DrunkLoader;
