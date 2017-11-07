const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user});
});

//auth logout
router.get('/logout', (req, res) =>{
    //handle with passport
    req.logout();
    res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //before this is fired, the passport callback function is fired in the passport setup 
    //with the profile info using the code on redirect uri.
    //res.send(req.user);
    res.redirect('/profile');
});

module.exports = router;