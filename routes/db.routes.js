const express = require("express");
const path = require("path");
const router = express.Router();

const { getUser, newUser, listHighScores, updateScore } = require('../middleware/dbMiddleware');

router.get('/highscores', listHighScores);
router.get('/user', getUser);
router.post('user/new', newUser);
router.post('user/score', updateScore);

module.exports = router;
