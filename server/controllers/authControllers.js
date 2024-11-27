const { google } = require("googleapis")
const oAuth2 = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL)
SCOPES = ["email", "profile", "https://www.googleapis.com/auth/spreadsheets", "https://mail.google.com/"]
const axios = require("axios")
const authService = require("../services/authService")

async function authDirect(req, res) {
  const authUrl = oAuth2.generateAuthUrl({
    access_type: "offline", // This ensures we get a refresh token
    scope: SCOPES,
    prompt: "consent",
  })
  res.send(authUrl)
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
    const user = await authService.addUserToDb(response.data,oAuth2.credentials)
    res.redirect(`${process.env.FE_URL}/tools`)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error during authentication.")
  }
}

module.exports = { authDirect, authCallback }
