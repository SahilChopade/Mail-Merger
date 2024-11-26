const { Buffer } = require("buffer")

const getSpreadsheetId = (url) => {
  const regex = /\/d\/([a-zA-Z0-9-_]+)/
  const match = url.match(regex)
  if (match && match[1]) {
    return match[1] // Return the spreadsheet ID
  } else {
    throw new Error("Invalid URL: Unable to extract spreadsheet ID.")
  }
}

function decodeBase64Url(base64Url) {
  return Buffer.from(base64Url.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
}

function encodeBase64Url(input) {
  return Buffer.from(input, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

module.exports = { getSpreadsheetId, decodeBase64Url, encodeBase64Url }
