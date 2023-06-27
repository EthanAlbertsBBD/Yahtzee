const DBQueries = require('../services/dbqueries');
const dbQueries = new DBQueries();

const  {getProfile} = require('../controllers/passport');

async function getUser(req, res) {
    try {
        const params = [req.query.user_id];
        const data = await dbQueries.getUserById(params);
        res.json(data[0].user_id);
        res.end();
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

async function listHighScores(req, res) {
    try {
        const data = await dbQueries.getHighScore();
        res.json(data);
        res.end();
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

async function newUser(req, res, next) {
    try {
        const params = [req.body.email];
        const user = await dbQueries.getUserById(params);

        if (user) {
            res.json({success: false, message: 'User already exists'});
        } else {
            await dbQueries.insertUser(params)
            res.json({success: true, message: 'New user created successfully'});
        }
        next();
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

async function getScore(req, res) {
    try {
        const profile = getProfile();
        const username = profile.username || profile.displayName;
        const email = [req.body.email || username];
        const data = await dbQueries.getUserScore([email]);

        res.json(data[0].high_score);
        res.end();
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

async function updateScore(req, res) {
    try {
        const profile = getProfile();
        const username = profile.username || profile.displayName;
        const score = req.body.score;
         const email = [req.body.email || username];
        const data = await dbQueries.getUserScore([email]);

        if (score > data[0].high_score) {
            const params = [email, score]
            await dbQueries.updateScore(params)
            res.json({success: true, message: 'User score updated'});
        } else {
            res.json({success: false, message: 'User score stayed the same'});
        }
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

module.exports = {
    getUser,
    newUser,
    listHighScores,
    updateScore,
    getScore
};
