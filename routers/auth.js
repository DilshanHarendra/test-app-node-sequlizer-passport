var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var router = express.Router();
var Users = require('../models/users');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/redirect-google',
    scope: [ 'profile', 'email' ]
}, async function verify(issuer, profile, cb) {
    const email = profile.emails[0].value||''
    let userData
    if (!email){
        return cb({message:'email not found'});
    }
    try {
        await Users.findOne({where:{email:email}}).then(async user=>{
            if (!user){
                userData=  await Users.create({
                    providerId: profile.id,
                    displayName:profile.displayName,
                    firstName: profile.name.familyName,
                    lastName: profile.name.givenName,
                    email: email,
                    authProvider:"GOOGLE"
                })
            }else{
                userData = user
            }
        })
    }catch (e) {
        return cb({message:e});
    }
    return cb(null, userData);
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

router.get('/', (req, res)=> {
    res.render('login');
});

router.get('/google', passport.authenticate('google'));

router.get('/redirect-google', passport.authenticate('google', {
    successRedirect: '/user/profile',
    failureRedirect: '/error'
}));

router.post('/logout', (req, res)=> {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth');
    });
});

module.exports = router;
