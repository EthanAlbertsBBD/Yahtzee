const DbConnector = require('./dbconnector');
const dbConnector = new DbConnector();

class DbQueries {
    async getHighScore() {
        const query = 'SELECT TOP 5 high_score, user_id FROM Users ORDER BY high_score DESC';
        const data = await dbConnector.executePreparedStatement(query, null);
        return data.recordset;
    }

    async getUserById(params) {
        const query = "SELECT user_id FROM Users WHERE user_id = @param1";
        const data = await dbConnector.executePreparedStatement(query, params);
        return data.recordset;
    }

    async insertUser(params) {
        const query = 'INSERT INTO Users (user_id, high_score) VALUES (@param1, 0)';
        await dbConnector.executePreparedStatement(query, params);
    }

    async updateScore(params) {
        const query = 'UPDATE Users SET high_score = @param1 WHERE user_id = @param2';
        await dbConnector.executePreparedStatement(query, params);
    }

    async getUserScore(params) {
        const query = "SELECT high_score FROM Users WHERE user_id = @param1";
        const data = await dbConnector.executePreparedStatement(query, params);
        return data.recordset;
    }
}

module.exports = DbQueries;
