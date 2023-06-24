require('dotenv').config();
const sql = require('mssql');

class DbConnector {
    constructor() {
        this.config = {
            server: process.env.DATABASE_HOST,
            authentication: {
                type: 'default',
                options: {
                    userName: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                },
            },
        };
    }

    async getConnection() {
        try {
            return await sql.connect(this.config);
        } catch (error) {
            throw new Error('Failed to establish a database connection');
        }
    }

    async executePreparedStatement(query, params) {
        let connection;
        let statement;

        try {
            connection = await this.getConnection();
            statement = new sql.PreparedStatement(connection);

            await statement.prepare(query);

            if (params) {
                params.forEach((param, index) => {
                    statement.input(`param${index + 1}`, param);
                });
            }

            return await statement.execute();

        } catch (error) {
            throw new Error('Failed to execute the prepared statement');
        } finally {
            if (statement) {
                await statement.unprepare();
            }
            if (connection) {
                await connection.close();
            }
        }
    }

}


module.exports = DbConnector;
