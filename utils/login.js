module.exports = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('info', 'Vous devez être connecté pour accéder à cette fonctionnalité');
    res.redirect('/');
  },
  notLoggedIn: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    req.flash('info', 'Vous êtes déjà connecté');
    res.redirect('/');
  }
}
