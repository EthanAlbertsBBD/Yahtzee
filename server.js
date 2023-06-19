const express = require('express');
const favicon = require('serve-favicon');
const indexRoutes = require('./routes/index.routes'); 

// App configuration
const app = express();

// Static files
app.use(favicon('public/assets/favicon.png'));
app.use(express.static('public/views/login'));


// Routes
app.use(indexRoutes);

// Server
app.listen(3000, () => {
  console.log('http://localhost:3000');
});
