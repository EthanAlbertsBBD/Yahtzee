const express = require("express");
const path = require("path");
const router = express.Router();

const { getUser, newUser, listHighScores, updateScore } = require('../middleware/dbMiddleware');
const { ensureAuthenticated } = require('../middleware/authMiddleware');


router.get('/highscores', ensureAuthenticated, listHighScores);
router.get('/user', ensureAuthenticated, getUser);
router.post('user/new', ensureAuthenticated, newUser);
router.post('user/score', ensureAuthenticated, updateScore);

module.exports = router;
