const { google } = require("googleapis")
const User = require("../models/user.model")
const oAuth2 = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL)

async function authMiddleware(req, res, next) {
  try {
    const refreshToken = req.cookies["refreshToken"]
    if (!refreshToken) {
      return res.send({ success: false, message: "No Refresh Token is Set!" })
    }
    oAuth2.setCredentials({ refresh_token: refreshToken })
    const { credentials } = await oAuth2.refreshAccessToken()
    oAuth2.setCredentials(credentials)
    const ticket = await oAuth2.verifyIdToken({
      idToken: credentials.id_token,
      audience: process.env.CLIENT_ID,
    })
    const payload = ticket.getPayload()
    let user = await User.findOne({ googleId: `people/${payload.sub}` })
    if (!user) {
      return res.send({ success: false, message: "No User Present!" })
    }
    req.user = user
    req.oAuth2 = oAuth2
    next()
  } catch (error) {
    return res.status(500).send({ success: false, message: "Failed to authenticate." })
  }
}

module.exports = { authMiddleware }
