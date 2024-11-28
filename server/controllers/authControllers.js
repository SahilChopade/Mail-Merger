const { google } = require("googleapis")
const oAuth2 = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL)
const axios = require("axios")
const authService = require("../services/authService")
const { SCOPES } = require("../constants/constants")

async function authDirect(req, res) {
  const authUrl = oAuth2.generateAuthUrl({
    access_type: "offline", // This ensures we get a refresh token
    scope: SCOPES,
    // prompt: "consent",
  })
  return res.send(authUrl)
}

async function authCallback(req, res) {
  const code = req.query.code
  try {
    const { tokens } = await oAuth2.getToken(code)
    oAuth2.setCredentials(tokens)
    const response = await axios.get(`https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos`, {
      headers: {
        Authorization: `Bearer ${oAuth2.credentials.access_token}`,
      },
    })
    const user = await authService.addUserToDb(response.data, oAuth2.credentials)
    res.cookie("refreshToken", user.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (1 day in milliseconds)
      httpOnly: true, // Ensures cookie is accessible only by the web server
      secure: false, // Set to `true` if using HTTPS
      sameSite: "strict", // Protects against CSRF attacks
    })
    return res.redirect(`${process.env.FE_URL}/auth/login`)
  } catch (error) {
    console.log(error)
    return res.status(500).send("Error during authentication.")
  }
}

module.exports = { authDirect, authCallback }
