const fs = require("fs");
const { google } = require("googleapis");
const TOKEN_PATH = "token.json";
const oAuth2 = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

async function authMiddleware(req, res, next) {
  try {
    // Read the token from file
    const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
    
    // Set the credentials for OAuth2 client
    oAuth2.setCredentials(tokens);

    // Check if the access token is expired and refresh it if necessary
    if (oAuth2.isTokenExpiring()) {
      const { credentials } = await oAuth2.refreshAccessToken();
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials));  // Save the new tokens
      oAuth2.setCredentials(credentials);  // Update the credentials with new tokens
    }

    req.oAuth2 = oAuth2;  // Attach oAuth2 instance to request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return res.status(500).send("Failed to authenticate.");
  }
}

module.exports = { authMiddleware };
