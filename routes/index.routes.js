const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/login/login.html"));
});

router.get("/gameboard", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/views/gameboard/gameboard.html")
  );
});

router.get("/leaderboard", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/views/leaderboard/leaderboard.html")
  );
});

router.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/leaderboard/leaderboard.html'))
});

module.exports = router;
