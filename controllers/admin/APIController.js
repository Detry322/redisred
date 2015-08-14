var redirectModel = require('../../models/Redirect');

var sendJSON = function(res, obj, status) {
  res.status(status || 200);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(obj));
};

module.exports = function(redis, apiToken) {
  var Redirect = redirectModel(redis);
  var APIController = {};

  APIController.authenticate = function(req, res, next) {
    if (req.get('x-access-token') == apiToken)
      return next();
    else
      sendJSON(res, { error: "You failed to authenticate with the correct token." }, 403);
  };

  APIController.getAllRedirects = function(req, res) {
    Redirect.getAll(function(err, redirects) {
      if (err)
        res.status(500).send(err);
      else {
        sendJSON(res, redirects);
      }
    });
  };

  APIController.createRedirect = function(req, res) {
    var key = req.body.key;
    var url = req.body.url;
    if (!key || !url) {
      res.status(400).send("You failed to supply all of the parameters.");
      return;
    }
    Redirect.create(key, url, function(err, redirect) {
      if (err)
        res.status(500).send(err);
      else
        sendJSON(res, redirect);
    });
  };

  APIController.deleteRedirect = function(req, res) {
    var key = req.body.key;
    if (!key) {
      res.status(400).send("You failed to supply all of the parameters.");
      return;
    }
    Redirect.delete(key, function(err) {
      if (err)
        res.status(500).send(err);
      else
        sendJSON(res, {});
    });
  };

  return APIController;
};
