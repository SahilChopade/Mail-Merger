const User = require("../models/user.model")

async function addUserToDb(data, tokens) {
  try {
    console.log(data)
    console.log(tokens)
    let user = await User.findOne({ googleId: data.resourceName })
    if (!user) {
      user = new User({
        googleId: data.resourceName,
        name: data.names[0].displayName,
        email: data.emailAddresses[0].value,
        image: data.photos[0].url,
        refreshToken: tokens.refresh_token,
      })
      await user.save()
    }
    return user
  } catch (error) {
    return null
  }
}
module.exports = { addUserToDb }
