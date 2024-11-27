const passport = require("passport")
const User = require("../models/user.model")
const { SCOPES } = require("../constants/constants")

async function authDirect(req, res, next) {
  passport.authenticate("google", { scope: SCOPES })(req, res, next)
}

async function authCallback(req, res, next) {
  passport.authenticate("google", {
    successRedirect: `${process.env.FE_URL}/tools`,
    failureRedirect: `${process.env.FE_URL}/login`,
  })(req, res, next)
}

module.exports = { authDirect, authCallback }
