const userCtrl = require("../controllers/userControllers")
const { authMiddleware } = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/login", userCtrl.loginUser)
router.get("/logout", userCtrl.logOutUser)
router.get("/getUser", authMiddleware, userCtrl.getUser)
router.post("/password", authMiddleware, userCtrl.setPassword)

module.exports = router
