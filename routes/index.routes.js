const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/login/login.html'));
});

router.get('/gameboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/gameboard/gameboard.html'))
});

module.exports = router;
