require('dotenv').config();

const jwtSecretKey = process.env.SECRET_KEY;

module.exports = {
  jwtSecretKey,
};
