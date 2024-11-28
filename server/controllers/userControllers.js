const User = require("../models/user.model")
const bcrypt = require("bcrypt")

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.find({ email: email })
    if (!user.length) {
      return res.send({ success: false, message: "No Such user Exist!!" })
    }
    const passwordCheck = await bcrypt.compare(password, user[0].password)
    if (!passwordCheck) {
      return res.send({ success: false, message: "Wrong Password!" })
    }
    const userData = {
      name: user[0].displayName,
      image: user[0].image,
      email: user[0].email,
    }
    res.cookie("refreshToken", user[0].refreshToken, {
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (1 day in milliseconds)
      httpOnly: true, // Ensures cookie is accessible only by the web server
      secure: false, // Set to `true` if using HTTPS
      sameSite: "strict", // Protects against CSRF attacks
    })
    return res.send({ success: true, data: userData })
  } catch (error) {
    return res.send({ success: false, message: "Something went wrong!!" })
  }
}

async function logOutUser(req, res, next) {
  try {
    console.log(req.cookies["refreshToken"])
    res.clearCookie("refreshToken")
    return res.send({ success: true, message: "Logged Out Successfully.." })
  } catch (error) {
    return res.send({ success: false, message: "Something went wrong!!" })
  }
}

async function getUser(req, res, next) {
  try {
    if (!req.user) {
      return res.send({ success: false, message: "Can't fetch user!!" })
    }
    const userData = {
      name: req.user.displayName,
      image: req.user.image,
      email: req.user.email,
      isPasswordSet: req.user.isPasswordSet,
    }
    return res.send({ success: true, data: userData })
  } catch (error) {
    return res.send({ success: false, message: "Can't fetch user!!" })
  }
}

async function setPassword(req, res, next) {
  try {
    const { password } = req.body
    const id = req.user._id
    const user = await User.findById(id)
    if (!user) {
      return res.send({ success: false, message: "No Such user Exist!!" })
    }
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const updatedUser = await User.findByIdAndUpdate(id, { password: hashedPassword, isPasswordSet: true })
    if (!updatedUser) {
      return res.send({ success: false, message: "Unable to Set Password!!" })
    }
    const userData = {
      name: updatedUser.displayName,
      image: updatedUser.image,
      email: updatedUser.email,
      isPasswordSet: updatedUser.isPasswordSet,
    }
    return res.send({ success: true, message: "Password Set Successfully..", data: userData })
  } catch (error) {
    return res.send({ success: false, message: "Something went wrong!!" })
  }
}

module.exports = { getUser, setPassword, loginUser, logOutUser }
