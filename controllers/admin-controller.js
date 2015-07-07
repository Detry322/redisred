var redirectModel = require('../models/Redirect');
module.exports = function(redis) {
  var Redirect = redirectModel(redis);
  var AdminController = {};

  AdminController.getAllRedirects = function(req, res) {
    res.render('admin/redirects', { redirects: Redirect.getAll() });
  };

  AdminController.createRedirect = function(req, res) {
    var redirectName = req.params.redirect_name;
    var redirectUrl = req.params.redirect_url;
    if (redirectName && redirectUrl) {
      var err = Redirect.create(redirectName, redirectUrl);
      if (err)
        res.status(500).send(err);
      else
        res.status(200).send("Redirect '" + redirectName + "' created successfully.");
    } else {
      res.redirect('/admin/redirects');
    }
  };

  AdminController.deleteRedirect = function(req, res) {
    var redirectName = req.params.redirect_name;
    if (redirectName) {
      var err = Redirect.delete(redirectName);
      if (err)
        res.status(500).send(err);
      else
        res.status(200).send("Redirect '" + redirectName + "' deleted successfully.");
    }
  };

  return AdminController;
};
