var express = require('express');
var csrf = require('csurf');
var bodyParser = require('body-parser');

module.exports = function(frontend, api) {

  var apiRouter = express.Router();
  apiRouter.use(bodyParser.json());
  apiRouter.get('/', api.authenticate, api.getAllRedirects);
  apiRouter.post('/create', api.authenticate, api.createRedirect);
  apiRouter.post('/delete', api.authenticate, api.deleteRedirect);

  var csrfProtection = csrf({ cookie: true });
  var frontendRouter = express.Router();
  frontendRouter.use(bodyParser.urlencoded({ extended: false }));
  frontendRouter.get('/', frontend.showLogin);
  frontendRouter.post('/login', frontend.login);
  frontendRouter.get('/logout', frontend.logout);
  frontendRouter.get('/redirects', csrfProtection, frontend.authenticate, frontend.getAllRedirects);
  frontendRouter.post('/redirect/create', csrfProtection, frontend.authenticate, frontend.createRedirect);
  frontendRouter.post('/redirect/delete', csrfProtection, frontend.authenticate, frontend.deleteRedirect);

  var router = express.Router();
  router.use('/api', apiRouter);
  router.use('/', frontendRouter);
  router.get('*',function(req, res) {
    res.redirect('/admin');
  });

  return router;
};
