const router = require('express').Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_ID = "137295327318-r0e78v158cj02nk61mhguruknpkju58c.apps.googleusercontent.com";
const GOOGLE_SECRET = "QqJtIjLTelZjZKacYarqv-tb";

let user = {};

passport.use(new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3001/"
},
(accessToken, refreshToken, profile, done) => {
    user = { ... profile }
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
}); 

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.get("/google", passport.authenticate('google', {
    scope: ["profile", "email"]
}))


module.exports = router;