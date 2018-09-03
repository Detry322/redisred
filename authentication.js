var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport, clientId, clientSecret) {

  passport.serializeUser(function(username, done) {
    done(null, username);
  });
    
  passport.deserializeUser(function(username, done) {
    done(null, username);
  });

  passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "/admin/login/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }));
};
