var LocalStrategy = require('passport-local').Strategy;

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
      if (adminUsername == username && adminPassword == password)
        done(null, username);
      else 
        done(null, false, { message: "Incorrect Username or Password"} );
    }
  ));

};
