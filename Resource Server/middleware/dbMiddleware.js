const BbQueries = require('../services/dbqueries');
const dbQueries = new BbQueries();

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

async function updateScore(req, res) {
    try {
        const score = req.params('score');
        let params = [req.query.user_id];
        const data = await dbQueries.getHighScore(params);

        if (score > data[0].score) {
            params = [req.query.user_id, score]
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
    updateScore
};
