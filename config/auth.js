module.exports = {
  'google': {
    'clientID': process.env.GOOGLE_CLIENT_ID,
    'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
    'callbackURL': 'http://arcadiaa.herokuapp.com/auth/google/callback'
  }
};
