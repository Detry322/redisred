var express = require('express');

module.exports = function(rootRedirect, redirectController) {
  var router = express.Router();
  router.get('/', function(req, res) {
  	res.redirect(rootRedirect);
  })
  router.get('/:redirect_name', redirectController.redirect);
  return router;
};
