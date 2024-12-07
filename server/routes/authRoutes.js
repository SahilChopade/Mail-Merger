const { authDirect, authCallback, authSignUpDirect } = require("../controllers/authControllers")

const router = require("express").Router()

router.get("/auth", authDirect)
router.get("/authsignup", authSignUpDirect)
router.get("/auth/callback", authCallback)

module.exports = router
