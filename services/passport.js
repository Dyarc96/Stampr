const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./../keys/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleApiKey,
            clientSecret: keys.googlePrivateKey,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({ 
                        googleId: profile.id,
                        name: profile.name.givenName,
                        surname: profile.name.familyName,
                        isProvider: false,
                        linkedOrganizations: [],
                        linkedProviderOrganizations: []
                    })
                        .save()
                        .then(user => 
                            done(null, user)
                    )
                }
            })
        }
    ) 
)

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookApiKey,
            clientSecret: keys.facebookPrivateKey,
            callbackURL: '/auth/facebook/callback',
            proxy: true,
            profileFields: ['email', 'name']
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ facebookId: profile.id }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({ 
                            facebookId: profile.id,
                            name: profile.name.givenName,
                            surname: profile.name.familyName,
                            isProvider: false,
                            linkedOrganizations: [],
                            linkedProviderOrganizations: []
                        })
                        .save()
                        .then(user => 
                            done(null, user)
                    )
                }
            })
        }
    ) 
)