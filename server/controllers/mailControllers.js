const axios = require("axios")
const { getSpreadsheetId } = require("../utils/utils")
const { getRequiredDataFromSheets } = require("../services/sheetsService")

async function mailMerge(req, res) {
  try {
    const sheetID = getSpreadsheetId(process.env.SHEET_LINK)
    const response = await axios.get(`${process.env.SHEETS_ENDPOINT}/${sheetID}?includeGridData=true`, {
      headers: {
        Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
      },
    })
    const requiredSheet = response.data.sheets.filter((sheet) => sheet.properties.title === "Remote2")
    const rowData = requiredSheet[0].data[0].rowData
    const data = getRequiredDataFromSheets(rowData)
    res.send(data)
  } catch (error) {
    console.error("Error occurred:", error.response?.data || error.message)
    res.status(500).send({ error: "Failed to fetch data from Google Sheets." })
  }
}

module.exports = { mailMerge }
