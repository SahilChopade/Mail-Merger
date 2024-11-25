const { authDirect, authCallback } = require("../controllers/authControllers")

const router = require("express").Router()

router.get("/auth", authDirect)
router.get("/callback", authCallback)

module.exports = router
