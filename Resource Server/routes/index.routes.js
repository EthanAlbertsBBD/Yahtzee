const express = require('express');
const path = require('path');
const router = express.Router();

const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/login/login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/register/register.html'));
});

router.get('/gameboard', ensureAuthenticated, (req, res) => {
  res.sendFile(
    path.join(__dirname, '../public/views/gameboard/gameboard.html')
  );
});

router.get('/leaderboard', ensureAuthenticated, (req, res) => {
  res.sendFile(
    path.join(__dirname, '../public/views/leaderboard/leaderboard.html')
  );
});

module.exports = router;
