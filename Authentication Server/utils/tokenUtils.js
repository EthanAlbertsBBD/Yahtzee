const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/config');

// Generate an access token
function generateToken(email) {
  const payload = { email };
  return jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
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
