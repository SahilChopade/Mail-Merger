const { getSpreadsheetId } = require("../utils/utils")
const { getRequiredDataFromSheets } = require("../services/sheetsService")
const axios = require("axios")

async function getSheets(req, res) {
  try {
    const sheetID = getSpreadsheetId(req.body.sheetLink)
    const sheetResponse = await axios.get(`${process.env.SHEET_ENDPOINT}/${sheetID}?includeGridData=true`, {
      headers: {
        Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
      },
    })
    const sheetsList = sheetResponse.data.sheets.map((sheet) => {
      return sheet.properties.title
    })
    res.send({ success: true, data: sheetsList })
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to fetch Sheets from Google Sheets." })
  }
}

async function getSheetsData(req, res) {
  try {
    const sheetID = getSpreadsheetId(req.body.sheetLink)
    const sheetResponse = await axios.get(`${process.env.SHEET_ENDPOINT}/${sheetID}?includeGridData=true`, {
      headers: {
        Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
      },
    })
    const requiredSheet = sheetResponse.data.sheets.filter((sheet) => sheet.properties.title === req.body.sheetName)
    const rowData = requiredSheet[0].data[0].rowData
    const companyEmailData = getRequiredDataFromSheets(rowData)
    res.send({ success: true, data: companyEmailData.data })
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to fetch data from Google Sheets." })
  }
}

module.exports = { getSheetsData, getSheets }
