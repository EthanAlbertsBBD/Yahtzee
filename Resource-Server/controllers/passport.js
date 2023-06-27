const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const DBQueries = require("../services/dbqueries");
const dbQueries = new DBQueries();
require("dotenv").config();

let currentProfile;

// Google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await dbQueries.getUserById([profile.displayName]);

        if (!user) {
          await dbQueries.insertUser([profile.displayName]);
        } else {
          profile.accessToken = accessToken;
          profile.refreshToken = refreshToken;
        }

        currentProfile = profile;

        return done(null, profile);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        console.log(profile)
        const user = await dbQueries.getUserById([profile.username]);

        if (!user) {
          await dbQueries.insertUser([profile.username]);
        } else {
          profile.accessToken = accessToken;
          profile.refreshToken = refreshToken;
        }

        currentProfile = profile;

        return done(null, profile);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialization and deserialization of users
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = {
    passport,
    getProfile: function () {
        return currentProfile;
    }
}