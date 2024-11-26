const { getSpreadsheetId } = require("../utils/utils")
const { getRequiredDataFromSheets } = require("../services/sheetsService")
const axios = require("axios")

async function getSheetsData(req, res) {
  try {
    const sheetID = getSpreadsheetId(process.env.SHEET_LINK)
    const sheetResponse = await axios.get(`${process.env.SHEET_ENDPOINT}/${sheetID}?includeGridData=true`, {
      headers: {
        Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
      },
    })
    const requiredSheet = sheetResponse.data.sheets.filter((sheet) => sheet.properties.title === "Remote2")
    const rowData = requiredSheet[0].data[0].rowData
    const companyEmailData = getRequiredDataFromSheets(rowData)
    res.send({...companyEmailData})
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data from Google Sheets." })
  }
}

module.exports = { getSheetsData }
