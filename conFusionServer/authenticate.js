passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
User = require('./models/user');

JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
jwt = require('jsonwebtoken');

config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

exports.varifyAdmin = function(req, res, next) {
    if (req.user.admin) {
        next();
    } else {
        var err = new Error("You are not authorized to perform this operation!");
        err.status = 403;
        next(err);
    }
};
exports.verifyUser = passport.authenticate('jwt', { session: false });