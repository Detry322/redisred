// Load the dotfiles.
require('dotenv').load();

var port = process.env.PORT || 3000;
var redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379/0';
var sessionSecret = process.env.SESSION_SECRET || 'this is really secure';
var adminUsername = process.env.ADMIN_USERNAME || 'admin';
var adminPassword = process.env.ADMIN_PASSWORD || '123456';
var rootRedirect = process.env.ROOT_REDIRECT || 'https://google.com';
var apiToken = process.env.API_TOKEN || '1234567890abcdefghijklmnopqrstuvwxyz';

//Includes
var authentication = require('./authentication');
var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var Redis = require('ioredis');
var passport = require('passport');
var favicon = require('serve-favicon');
var RedisStore = require('connect-redis')(expressSession);

//Initialize auth
authentication(passport, adminUsername, adminPassword);

//Connect to Redis
var redis = new Redis(redisUrl);

//Initialize the app
var app = express();
var redisSessionStore = new RedisStore({client: redis});
app.set('views', './views');
app.set('view engine', 'jade');
app.use(favicon('./public/assets/favicon.png'));
app.use(cookieParser());
app.use(expressSession({ store: redisSessionStore, secret: sessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Initialize controllers
var frontendController = require('./controllers/admin/FrontendController')(redis, passport);
var apiController = require('./controllers/admin/APIController')(redis, apiToken);
var redirectController = require('./controllers/RedirectController')(redis);

//Initialize routes
var admin = require('./routes/admin.js')(frontendController, apiController);
app.use('/admin', admin);
var main = require('./routes/main.js')(rootRedirect, redirectController);
app.use('/', main);
app.use(function(req, res, next) {
  res.status(404).render('404');
});

// Start the server
console.log('Connecting to redis...');
redis.ping(function(err){
  if (!err) {
    console.log('Connection successful. Server listening on port ' + port);
    app.listen(port);
  }
});

