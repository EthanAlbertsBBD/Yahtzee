const jwt = require('jsonwebtoken');
require('dotenv').config();

async function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // If user is authenticated, allow them to proceed
    return next();
  } else {
    // Verify access token from cookie
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.redirect('/');
    }

    try {
      jwtSecretKey = process.env.SECRET_KEY;
      const decodedToken = jwt.verify(accessToken, jwtSecretKey, {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
      });

      // Verify the issuer and audience
      if (
        decodedToken.iss !== process.env.JWT_ISSUER ||
        decodedToken.aud !== process.env.JWT_AUDIENCE
      ) {
        throw new Error('Invalid access token');
      }

      req.user = decodedToken; // Attach the decoded token payload to the request object

      return next();
    } catch (error) {
      console.error('Error verifying access token:', error);
      return res.redirect('/');
    }
  }
}

module.exports = { ensureAuthenticated };
