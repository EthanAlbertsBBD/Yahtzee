const passport = require("passport");
const config = require("../config/auth.config");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

// Google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: config.google_callback_url,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // TODO: Add user handling logic here

      // Continue with authentication flow
      return done(null, profile);
    }
  )
);

passport.use(new GitHubStrategy({
        clientID: config.github_client_id,
        clientSecret: config.github_client_secret,
        callbackURL: config.github_callback_url
    },
    async function (request, accessToken, refreshToken, profile, done) {
        // TODO: Add user handling logic here

        // Continue with authentication flow
        return done(null, profile);
    }
));

// Serialization and deserialization of users
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
