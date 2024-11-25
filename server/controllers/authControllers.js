const { google } = require("googleapis")
const fs = require("fs")
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
const oAuth2 = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL)
const TOKEN_PATH = "token.json"

async function authDirect(req, res) {
  const authUrl = oAuth2.generateAuthUrl({
    access_type: "offline", // This ensures we get a refresh token
    scope: SCOPES
  })
  res.redirect(authUrl)
}

async function authCallback(req, res) {
  const code = req.query.code
  try {
    const { tokens } = await oAuth2.getToken(code)
    oAuth2.setCredentials(tokens)
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens))
    res.send("Authentication successful! You can now use the app.")
  } catch (error) {
    console.log(error);
    res.status(500).send("Error during authentication.")
  }
}

module.exports = { authDirect, authCallback }
