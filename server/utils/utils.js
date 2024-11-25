const getSpreadsheetId = (url) => {
  const regex = /\/d\/([a-zA-Z0-9-_]+)/
  const match = url.match(regex)
  if (match && match[1]) {
    return match[1] // Return the spreadsheet ID
  } else {
    throw new Error("Invalid URL: Unable to extract spreadsheet ID.")
  }
}

module.exports = { getSpreadsheetId }
