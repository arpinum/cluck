'use strict';

var findup = require('findup-sync');
var Drunk = require('./Drunk');

function DrunkLoader() {
  this.load = load;

  function load(configuration) {
    var drunk = new Drunk(configuration);
    var drunkfile = findup('Drunkfile.js', {nocase: true});
    require(drunkfile)(drunk);
    return drunk;
  }
}

module.exports = DrunkLoader;
