const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

//initialize passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect('mongodb://localhost/futurama');

mongoose.connection.once('open', () =>{
    console.log('Connection has been made');
}).on('error', (error) => {
    console.log('connection error: '+ error);
})

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
//create home route
app.get('/', (req, res) => {
    res.render('home');
})
app.listen(3001, () => {
    console.log('App listening at 3001');
});