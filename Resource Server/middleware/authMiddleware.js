async function ensureAuthenticated(req, res, next) {
  //TODO Implemnt cookie parser
  if (req.isAuthenticated() || req.cookies.accessToken) {
    // If user is authenticated, allow them to proceed
    return next();
  } else {
    // If user is not authenticated, redirect to login page or show an error
    res.redirect('/'); // Modify the URL according to your application's routes
  }
}

module.exports = { ensureAuthenticated };
