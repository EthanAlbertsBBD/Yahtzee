const DbConnector = require('./dbconnector');
const dbConnector = new DbConnector();
async function getScore() {
    const connection = await dbConnector.getConnection();
    connection.on('connect', function (err) {
        if (err) {
            console.error(err);
            return;
        }

        // SQL query execution
        const request = new Request('SELECT * FROM Users',
            function (error, rowCount, rows) {
            if (error) {
                console.error(error);
                return;
            }

            // Process the rows returned by the query
            rows.forEach(row => {
                console.log(row);
            });

            // Close the connection
            connection.close();
        });

        // Execute the query
        connection.execSql(request);
    });
}