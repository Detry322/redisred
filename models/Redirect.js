var urlKeyPrefix = "url_";
var clicksKeyPrefix = "clicks_";

module.exports = function(redis) {
  var Redirect = {};

  Redirect.get = function(key) {
    return false;
  };

  Redirect.incr = function(key) {
    return false;
  };

  Redirect.create = function(key, url) {
    return false;
  };

  Redirect.delete = function(key) {
    return false;
  };

  Redirect.getAll = function() {
    return false;
  };

  return Redirect;
};
