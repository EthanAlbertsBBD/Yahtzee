const express = require("express");
const path = require("path");
//const favicon = require("serve-favicon");
const session = require("express-session");
const passport = require("passport");
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const dbRoutes = require('./routes/db.routes');
const cookieParser = require("cookie-parser");
require("dotenv").config();

// App configuration
const app = express();
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.session());

// Static files
//removing for now to get app runner to build
//app.use(favicon("public/assets/favicon.png"));

app.use(express.static(path.join(__dirname, "public", "views", "html")));
app.use(express.static(path.join(__dirname, "public", "views", "css")));
app.use(express.static(path.join(__dirname, "public", "views", "js")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(indexRoutes);
app.use(authRoutes);
app.use(dbRoutes);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

