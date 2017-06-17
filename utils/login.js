module.exports = {
  /*
  Middleware function that ensures that a user has to be authenticated to continue his operation
   */
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('info', 'Vous devez être connecté pour accéder à cette fonctionnalité');
    res.redirect('/');
  },
  /*
  Middleware function that ensures that a user has to be not authenticated to continue his operation
  Will be used for example if a user wants to access signin page and signup page though he is already logged
   */
  notLoggedIn: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    req.flash('info', 'Vous êtes déjà connecté');
    res.redirect('/');
  }
}
