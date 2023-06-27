const express = require('express');
const path = require('path');
const router = express.Router();

const { ensureAuthenticated } = require('../middleware/authMiddleware');



router.get('/', (req, res) => {
  res.redirect('/login')
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "html", "login.html"));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/html/register.html'));
});

router.get('/gameboard', ensureAuthenticated, (req, res) => {
  res.sendFile(
    path.join(__dirname, '../public/views/html/gameboard.html')
  );
});

router.get('/leaderboard', ensureAuthenticated, (req, res) => {
  res.sendFile(
    path.join(__dirname, '../public/views/html/leaderboard.html')
  );
});

module.exports = router;