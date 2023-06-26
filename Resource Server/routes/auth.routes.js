const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../controllers/passport');
const {loginMiddleware, registerMiddleware} = require('../middleware/loginMiddleware');

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/gameboard',
    failureRedirect: '/auth/google/failure',
  })
);

router.get('/auth/google/failure', (req, res) => {
  res.send('Something went wrong with Google authentication.');
});

router.get(
  '/auth/github',
  passport.authenticate('github', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/gameboard',
    failureRedirect: '/auth/github/failure',
  })
);

router.get('/auth/github/failure', (req, res) => {
  res.send('Something went wrong with Github authentication.');
});

router.post('/login', loginMiddleware, (req, res) => {
  res.redirect('/gameboard');
});

router.post('/registerUser', registerMiddleware, (req, res) => {
    res.redirect('/gameboard')
});

module.exports = router;
