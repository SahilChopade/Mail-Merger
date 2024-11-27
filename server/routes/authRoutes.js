const { authDirect, authCallback } = require("../controllers/authControllers")

const router = require("express").Router()

router.get("/auth", authDirect)
router.get("/auth/callback", authCallback)

module.exports = router
