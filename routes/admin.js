var express = require('express');

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.status(404).render('404');
};

module.exports = function(passport, adminController) {
  var router = express.Router();

  router.get('/', function(req, res) {
    res.render('admin/root');
  });

  router.get('/login', passport.authenticate('local',{
    successRedirect: '/admin/redirects',
    failureRedirect: '/admin'
  }));

  router.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
      res.redirect('/admin');
    });
  });

  router.get('/redirects', isAuthenticated, adminController.getAllRedirects);
  router.post('/redirect/create', isAuthenticated, adminController.createRedirect);
  router.post('/redirect/delete', isAuthenticated, adminController.deleteRedirect);

  return router;
};
