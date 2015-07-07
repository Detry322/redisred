var redirectModel = require('../models/Redirect');
module.exports = function(redis) {
  var Redirect = redirectModel(redis);
  var RedirectController = {};

  RedirectController.redirect = function(req, res) {
    var redirectName = req.params.redirect_name;
    var redirect = Redirect.get(redirectName);
    if (redirect) {
      Redirect.incr(redirectName);
      res.redirect(redirect.url);
    } else
      res.status(404).render('404');
  };

  return RedirectController;
};
