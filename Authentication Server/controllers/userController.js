const bcrypt = require('bcrypt');
const {
  createUser,
  findUserByEmail,
  storeRefreshToken,
  revokeRefreshToken,
} = require('../services/userService');
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
} = require('../utils/tokenUtils');

// User registration
async function registerUser(req, res) {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if the email is already registered
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and store refresh token
    await createUser(email, hashedPassword);
    const refreshToken = generateRefreshToken(email);
    await storeRefreshToken(email, refreshToken);

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

// User login
async function loginUser(req, res) {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate access token and refresh token
    const accessToken = generateToken(email);
    const refreshToken = generateRefreshToken(email);

    // Store refresh token
    await storeRefreshToken(email, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

// User logout
async function logoutUser(req, res) {
  const { refreshToken } = req.body;

  // Input validation
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // Revoke refresh token
    await revokeRefreshToken(refreshToken);

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

// Refresh access token
async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  // Input validation
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // Verify the refresh token
    const decodedToken = verifyToken(refreshToken);
    const { email } = decodedToken;

    // Check if the refresh token is valid
    const storedRefreshToken = await getStoredRefreshToken(email);
    if (refreshToken !== storedRefreshToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = generateToken(email);

    res.json({ accessToken });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
};
