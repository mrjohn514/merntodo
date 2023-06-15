//step 1 import passport
const passport = require('passport')

//requiring strateguy using
const jwtStrategy = require('passport-jwt').Strategy

//module help us to extract jwt from header
const Extractjwt = require('passport-jwt').ExtractJwt

//since we are going to use user model for authenctication
const User = require('../models/user')

let opts = {
  jwtFromRequest: Extractjwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
}

passport.use(
  new jwtStrategy(opts, async function (jwtPayload, done) {
    try {
      const user = await User.findById(jwtPayload._id)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (err) {
      console.log('Error finding user:', err)
      return done(err, false)
    }
  })
)

module.exports = passport
