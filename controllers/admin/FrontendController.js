var redirectModel = require('../../models/Redirect');
module.exports = function(redis, passport) {
  var Redirect = redirectModel(redis);
  var FrontendController = {};

  //Authentication stuff...
  FrontendController.authenticate = function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    else
      res.redirect('/admin');
  };

  FrontendController.showLogin = function(req, res) {
    if (req.isAuthenticated())
      res.redirect('/admin/redirects');
    else
      res.render('admin/root');
  };

  FrontendController.login = passport.authenticate('local', {
    successRedirect: '/admin/redirects',
    failureRedirect: '/admin#incorrect'
  });

  FrontendController.logout = function(req, res) {
    req.session.destroy(function () {
      res.redirect('/admin');
    });
  };

  //Actual display logic
  FrontendController.getAllRedirects = function(req, res) {
    Redirect.getAll(function(err, redirects) {
      if (err)
        res.status(500).send(err);
      else {
        res.status(200).render('admin/redirects', { redirects: redirects, token: req.csrfToken() });
      }
    });
  };

  FrontendController.createRedirect = function(req, res) {
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
        res.redirect('/admin/redirects');
    });
  };

  FrontendController.deleteRedirect = function(req, res) {
    var key = req.body.key;
    if (!key) {
      res.status(400).send("You failed to supply all of the parameters.");
      return;
    }
    Redirect.delete(key, function(err) {
      if (err)
        res.status(500).send(err);
      else
        res.redirect('/admin/redirects');
    });
  };

  return FrontendController;
};
