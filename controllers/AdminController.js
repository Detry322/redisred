var redirectModel = require('../models/Redirect');
module.exports = function(redis) {
  var Redirect = redirectModel(redis);
  var AdminController = {};

  AdminController.getAllRedirects = function(req, res) {
    Redirect.getAll(function(err, redirects) {
      if (err)
        res.status(500).send(err);
      else
        res.status(200).render('admin/redirects', { redirects: redirects });
    });
  };

  AdminController.createRedirect = function(req, res) {
    var redirectKey = req.params.redirect_key;
    var redirectUrl = req.params.redirect_url;
    if (redirectKey && redirectUrl) {
      Redirect.create(redirectKey, redirectUrl, function(err, redirect) {
        if (err)
          res.status(500).send(err);
        else
          res.status(200).send("Redirect '" + redirect.key + "' created successfully.");
      });
    } else {
      res.redirect('/admin/redirects');
    }
  };

  AdminController.deleteRedirect = function(req, res) {
    var redirectKey = req.params.redirect_key;
    if (redirectKey) {
      Redirect.delete(redirectName, function(err) {
        if (err)
          res.status(500).send(err);
        else
          res.status(200).send("Redirect deleted successfully.");
      });
    } else {
      res.redirect('/admin/redirects');
    }
  };

  return AdminController;
};
