var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy({
      callbackURL:'/',
      clientID: "137295327318-r0e78v158cj02nk61mhguruknpkju58c.apps.googleusercontent.com",
      clientSecret: "QqJtIjLTelZjZKacYarqv-tb"
    }, () => {
  
    })
  )