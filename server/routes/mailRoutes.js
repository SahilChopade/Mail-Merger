const { getDraftsList, sendMassMail } = require("../controllers/mailControllers")
const { authMiddleware } = require("../middlewares/authMiddleware")
const router = require("express").Router()

router.get("/getdraftslist", authMiddleware, getDraftsList)
router.post("/sendmails", authMiddleware, sendMassMail)

module.exports = router
