const { getSheetsData } = require("../controllers/sheetControllers")
const { authMiddleware } = require("../middlewares/authMiddleware")
const router = require("express").Router()

router.get("/getsheetdata", authMiddleware, getSheetsData)

module.exports = router
