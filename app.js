// Load the dotfiles.
require('dotenv').load();

var port = process.env.PORT || 3000;
var redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379/0';
var sessionSecret = process.env.SESSION_SECRET || 'this is really secure';
var adminUsername = process.env.ADMIN_USERNAME || 'admin';
var adminPassword = process.env.ADMIN_PASSWORD || '123456';

//Includes
var authentication = require('./authentication');
var express = require('express');
var expressSession = require('express-session');
var Redis = require('ioredis');
var passport = require('passport');
var favicon = require('serve-favicon');

//Initialize auth
authentication(passport, adminUsername, adminPassword);

//Initialize the app
var app = express();
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('./public'));
app.use(expressSession({ secret: sessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Connect to Redis
var redis = new Redis(redisUrl);

//Initialize controllers
var adminController = require('./controllers/admin-controller')(redis);
var redirectController = require('./controllers/redirect-controller')(redis);

//Initialize routes
var admin = require('./routes/admin.js')(passport, adminController);
app.use('/admin', admin);
var main = require('./routes/main.js')(redirectController);
app.use('/', main);
app.use(function(req, res, next) {
  res.status(404).render('404');
});

// Start the server
app.listen(port);
console.log('App listening on port ' + port);
