require('dotenv').config();

const dbConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  server: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  options: {
    encrypt: false,
  },
};

module.exports = dbConfig;
