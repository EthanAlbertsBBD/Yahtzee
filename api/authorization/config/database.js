require("dotenv").config();
var Connection = require("tedious").Connection;

const config = {
  server: process.env.DATABASE_HOST,
  options: {
    database: process.env.DATABASE_NAME,
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    }
  }
};

const connection = new Connection(config);

connection.on('connect', (err) => {
    if(err) {
        console.log("Database connection error: ", err);
    }
    executeStatement();
})

connection.connect();


module.exports = connection;
