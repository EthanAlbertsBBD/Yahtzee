const mssql = require('mssql');
const dbConfig = require('../config/dbConfig');

// Find a user by email
async function findUserByEmail(email) {
  try {
    const pool = await mssql.connect(dbConfig);
    const request = pool.request();
    request.input('Email', mssql.VarChar(255), email);

    const query = 'SELECT * FROM users WHERE email = @Email;';
    const result = await request.query(query);

    return result.recordset[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

// Create a new user
async function createUser(email, password) {
  try {
    const pool = await mssql.connect(dbConfig);
    const request = pool.request();
    request.input('Email', mssql.VarChar(255), email);
    request.input('Password', mssql.VarChar(255), password);

    const query =
      'INSERT INTO users (email, password) VALUES (@Email, @Password);';
    await request.query(query);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Store refresh token for a user
async function storeRefreshToken(email, refreshToken) {
  try {
    const pool = await mssql.connect(dbConfig);
    const request = pool.request();
    request.input('Email', mssql.VarChar(255), email);
    request.input('RefreshToken', mssql.VarChar(255), refreshToken);

    const query =
      'UPDATE users SET refreshToken = @RefreshToken WHERE email = @Email;';
    await request.query(query);
  } catch (error) {
    console.error('Error storing refresh token:', error);
    throw error;
  }
}

// Get stored refresh token for a user
async function getStoredRefreshToken(email) {
  try {
    const pool = await mssql.connect(dbConfig);
    const request = pool.request();
    request.input('Email', mssql.VarChar(255), email);

    const query = 'SELECT refreshToken FROM users WHERE email = @Email;';
    const result = await request.query(query);

    return result.recordset[0].refreshToken;
  } catch (error) {
    console.error('Error getting stored refresh token:', error);
    throw error;
  }
}

// Revoke refresh token for a user
async function revokeRefreshToken(refreshToken) {
  try {
    const pool = await mssql.connect(dbConfig);
    const request = pool.request();
    request.input('RefreshToken', mssql.VarChar(255), refreshToken);

    const query =
      'UPDATE users SET refreshToken = NULL WHERE refreshToken = @RefreshToken;';
    await request.query(query);
  } catch (error) {
    console.error('Error revoking refresh token:', error);
    throw error;
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  storeRefreshToken,
  getStoredRefreshToken,
  revokeRefreshToken,
};
