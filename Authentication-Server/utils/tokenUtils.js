const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/config');
require("dotenv").config();

// Generate an access token
function generateToken(email) {
  const payload = { email };
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  };
  return jwt.sign(payload, jwtSecretKey, options);
}

// Generate a refresh token
function generateRefreshToken(email) {
  const payload = { email };
  return jwt.sign(payload, jwtSecretKey, { expiresIn: '7d' });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, jwtSecretKey);
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
};