const express = require("express");
const favicon = require("serve-favicon");
const passport = require("passport");
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
require('https').globalAgent.options.rejectUnauthorized = false;


// App configuration
const app = express();
app.use(passport.initialize());

// Static files
app.use(favicon("public/assets/favicon.png"));
app.use(express.static("public/views/login"));
app.use(express.static("public/views/gameboard"));

// Routes
app.use(indexRoutes);
app.use(authRoutes);

// Server
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
