const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        //accessToken is used when we go back and alter the users profile
        //refreshToken is used to refresh the acessToken after it expires
        //profile is the information from the code.

        //check if user exists already
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if(currentUser){
                console.log('user is:' + currentUser);
                done(null, currentUser);
            }else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log("New user created: "+ newUser);
                    done(null, newUser);
                });
            }
        })
    })
)