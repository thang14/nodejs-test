var util = require('../util');

exports.task = function() {
  return util.buildLoopback(true);
};