require('dotenv').config();
const sql = require('mssql');

class DbConnector {
    constructor() {
        this.config = {
            server: process.env.DATABASE_HOST,
            database: 'YahtzeeDB',
            authentication: {
                type: 'default',
                options: {
                    userName: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                },
            },
            options: {
                trustServerCertificate: true,
                trustedConnection: true,
                enableArithAbort: false
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
        const connection = await this.getConnection();
        const statement = new sql.PreparedStatement(connection);

        try {
            const paramValues = {};
            if (params) {
                params.forEach((param, index) => {
                    if (param !== undefined && param !== null) {
                        statement.input(`param${index + 1}`, sql.VarChar);
                        paramValues[`param${index + 1}`] = param;
                    }
                });
            }

            await statement.prepare(query);

            return await statement.execute(paramValues);
        } catch (error) {
            console.log(`Failed to execute the prepared statement: ${error.message}`);
        } finally {
            await statement.unprepare();
            await connection.close();
        }
    }
}

module.exports = DbConnector;
