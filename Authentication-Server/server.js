const express = require('express');
const helmet = require('helmet');

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} = require('./controllers/userController');

const app = express();
app.use(express.json());
app.use(helmet());

// Routes
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/logout', logoutUser);
app.post('/refresh-token', refreshToken);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
