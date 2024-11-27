const passport = require("passport")
const { SCOPES } = require("../constants/constants")
const User = require("../models/user.model")
const GoogleStrategy = require("passport-google-oauth2").Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URL,
      scope: SCOPES,
      passReqToCallback: true,
      access_type: "offline",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log("access token  ", accessToken)
        console.log("refresh token  ", refreshToken)

        let user = await User.findOne({ googleId: profile.id })
        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            password: "123",
          })
          await user.save()
        }
        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user)
})

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user)
})
