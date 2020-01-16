const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./configuration');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'VanNguyen'
},async (payload,done) =>{
    try {
        //fine the user in token
        const user = await User.findById(payload.sub);
        //if user doesn't exists,handle it
        if(!user){
            return done(null,false);
        }
        //return user
        done(null,user);
    } catch (error) {
        done(error,false);
    }
}))

//local strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email,password,done) =>{
    try {
        //find user
        const user = await User.findOne({email});
        //if not,handle it
        if(!user){
            return done(null,false);
        }
        //check if the password is correct
        const isMatch = await user.isValidPassword(password);
        //if not handle it
        if(!isMatch){
            return done(null,false);
        }
        //return the user
        done(null,user);
    } catch (error) {
        return done(error,false);
    }
}))