const User = require("../models/user.model")

async function addUserToDb(data, tokens) {
  try {
    let user = await User.findOne({ googleId: data.resourceName })
    if (!user) {
      user = new User({
        googleId: data.resourceName,
        displayName: data.names[0].displayName,
        email: data.emailAddresses[0].value,
        image: data.photos[0].url,
        refreshToken: tokens.refresh_token,
        isPasswordSet: false,
      })
      await user.save()
    } else {
      await User.updateOne({ googleId: data.resourceName }, { refreshToken: tokens.refresh_token })
    }
    return user
  } catch (error) {
    return null
  }
}
module.exports = { addUserToDb }
