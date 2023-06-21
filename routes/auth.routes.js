const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../controllers/passport");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/gameboard",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/auth/google/failure", (req, res) => {
  res.send("Something went wrong with Google authentication.");
});

module.exports = router;
