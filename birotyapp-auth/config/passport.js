var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var user = require('../data/users');
const setupPassportStrategies = () => {
    passport.use(new localStrategy(
        {
            usernameField: 'email'
        },
        function (username, password, done) {
            user.findOne({ email: username }).then(item => {
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
            }).catch(err => done(err));
        }
    )
    );
}
module.exports=setupPassportStrategies;