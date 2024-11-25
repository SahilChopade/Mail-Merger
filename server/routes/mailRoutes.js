const { mailMerge } = require("../controllers/mailControllers")
const { authMiddleware } = require("../middlewares/authMiddleware")
const router = require("express").Router()

router.get("/mail", authMiddleware, mailMerge)

module.exports = router
