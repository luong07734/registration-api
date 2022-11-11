const passport = require ('passport');
const LocalStrategy = require('passport-local');
const usersService = require('../components/users/usersService');
const config = require('../config');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, jwt_payload);
}));

passport.use(new LocalStrategy({usernameField: 'email', session: false},async function verify(username, password, cb) {
        console.log(username, password);
        try{
            const user = await usersService.verifyUser(username, password);
            if(user)
                return cb(null, user)
            return cb(null, false, { message: 'Incorrect username or password.' });
                
        }catch(e){
            return cb(err)
        }
  }));

  module.exports = passport;