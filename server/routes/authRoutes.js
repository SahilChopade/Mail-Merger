const { authDirect, authCallback } = require("../controllers/authControllers")

const router = require("express").Router()

router.get("/auth/google", authDirect)
router.get("/auth/google/callback", authCallback)

module.exports = router
