var redirectModel = require('../models/Redirect');
module.exports = function(redis) {
  var Redirect = redirectModel(redis);
  var RedirectController = {};

  RedirectController.redirect = function(req, res) {
    var redirectName = req.params.redirect_name;
    Redirect.get(redirectName, function(err, redirect) {
      if (err)
        res.status(500).send(err);
      else if (!redirect)
        res.status(404).render('404');
      else
        res.redirect(redirect.url);
    });
  };

  return RedirectController;
};
