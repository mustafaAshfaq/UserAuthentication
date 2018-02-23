var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var user = require('mongoose').model('User');

passport.use(new localStrategy(
    {
        usernameField:'email'
    },
    function (username, password, done) {
        user.findOne({ email: username }, (err, item) => {
            if (err)
                return done(err);
            if (!item)
                return done(null, false, {
                    message: 'user not found'
                });
            else if (!item.validatePassword(password))
                return done(null, false, {
                    message: 'Invalid password'
                });
            else
                return done(null, item);
        });
    }
)
);