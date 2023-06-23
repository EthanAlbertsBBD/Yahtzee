class DbConnector {
  constructor() {
    require('dotenv').config();
    this.Connection = require('tedious').Connection;
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

  testConnection() {
    let connection = new this.Connection(this.config);
    connection.on('connect', function (err) {
      console.log('Ethan Connected Me');
    });
    connection.connect();
  }

  getConnection() {
    const connection = new this.Connection(this.config);
    return connection;
  }
}

module.exports = DbConnector;
