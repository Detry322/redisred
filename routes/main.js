var express = require('express');

module.exports = function(redirectController) {
  var router = express.Router();
  router.get('/:redirect_name', redirectController.redirect);
  return router;
};
