const config = {
    'port': process.env.PORT || 3000,
    'secret': 'mySecretKey',
    'database': process.env.ARCADIAA_MLAB_URI,
    auth: {
        'google': {
            'clientID': process.env.GOOGLE_CLIENT_ID,
            'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
            'callbackURL': 'http://arcadiaa.herokuapp.com/auth/google/callback'
        }
    }
}

export default config;
