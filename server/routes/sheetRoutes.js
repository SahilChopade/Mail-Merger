const { getSheetsData, getSheets } = require("../controllers/sheetControllers")
const { authMiddleware } = require("../middlewares/authMiddleware")
const router = require("express").Router()

router.post("/getsheets", authMiddleware, getSheets)
router.post("/getsheetdata", authMiddleware, getSheetsData)

module.exports = router
