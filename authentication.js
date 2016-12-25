var LocalStrategy = require('passport-local').Strategy;
var bufferEq = require('buffer-equal-constant-time');

module.exports = function(passport, adminUsername, adminPassword) {

  passport.serializeUser(function(username, done) {
    done(null, username);
  });

  passport.deserializeUser(function(username, done) {
    done(null, username);
  });

  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
    }, function(username, password, done) {
      adminUsername = new Buffer(adminUsername);
      adminPassword = new Buffer(adminPassword);
      username = new Buffer(username);
      password = new Buffer(password);
      if (bufferEq(adminUsername, username) && bufferEq(adminPassword, password))
        done(null, username);
      else 
        done(null, false, { message: "Incorrect Username or Password"} );
    }
  ));

};
