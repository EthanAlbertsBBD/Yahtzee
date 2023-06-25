const express = require("express");
const path = require("path");
const router = express.Router();

const { getUser, newUser, listHighScores, updateScore } = require('../middleware/dbMiddleware');
<<<<<<< HEAD
const { ensureAuthenticated } = require('../middleware/authMiddleware');


router.get('/highscores', ensureAuthenticated, listHighScores);
router.get('/user', ensureAuthenticated, getUser);
router.post('user/new', ensureAuthenticated, newUser);
router.post('user/score', ensureAuthenticated, updateScore);
=======

router.get('/highscores', listHighScores);
router.get('/user', getUser);
router.post('user/new', newUser);
router.post('user/score', updateScore);
>>>>>>> 083d8b6 (folder restructure)

module.exports = router;
