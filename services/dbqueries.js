const DbConnector = require('./dbconnector');
const dbConnector = new DbConnector();

class DbQueries {
    async getHighScore() {
        const query = 'SELECT TOP 5 user_id, high_score FROM Users';
        return dbConnector.executePreparedStatement(query, null);
    }

    async getUserById(params) {
        const query = 'SELECT user_id FROM Users WHERE user_id = @param1';
        return dbConnector.executePreparedStatement(query, params);
    }

    async insertUserScore(params) {
        const query = 'INSERT INTO Users (user_id, score) VALUES (@param1, @param2)';
        return dbConnector.executePreparedStatement(query, params);
    }

    async insertUser(params) {
        const query = 'INSERT INTO Users (user_id) VALUES (@param1)';
        return dbConnector.executePreparedStatement(query, params);
    }

    async updateScore(params) {
        const query = 'UPDATE Users SET score = @param1 WHERE user_id = @param2';
        return dbConnector.executePreparedStatement(query, params);
    }
}

module.exports = DbQueries;
