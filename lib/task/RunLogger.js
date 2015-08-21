'use strict';

var moment = require('moment');
var _ = require('lodash');
var _s = require('underscore.string');

function RunLogger(cluck, taskName, options) {
  options = optionsInitialized();

  var self = this;
  self.runStarted = runStarted;
  self.runEnded = runEnded;

  var startTime;
  var endTime;

  function optionsInitialized() {
    return _.defaults({}, options, {duration: duration});
  }

  function runStarted() {
    startTime = new Date();
    cluck.log.info(_s.sprintf('Running "%s" task', taskName));
  }

  function runEnded() {
    endTime = new Date();
    if (cluck.configuration.stats) {
      cluck.log.info(_s.sprintf('Done running "%s". Duration: %s ms', taskName, options.duration()));
    }
  }

  function duration() {
    var diff = moment(endTime).diff(moment(startTime));
    var rawDuration = moment.duration(diff);
    return rawDuration.asMilliseconds();
  }
}

module.exports = RunLogger;
