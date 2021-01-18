const express = require('express');
const keys = require('./keys/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./models/Organization');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))

app.use(passport.initialize());

app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/organizationRoutes')(app);
require('./routes/userRoutes')(app);

// Middleware for always routing to https:
// Uncomment when pushing to prod

app.enable('trust proxy');
app.use (function (req, res, next) {
    if (req.secure) {
            next();
    } else {
            res.redirect('https://' + req.headers.host + req.url);
    }
});

// Production build
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);