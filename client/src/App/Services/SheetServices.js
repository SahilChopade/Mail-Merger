import axios from "axios"
const BE_URL = process.env.REACT_APP_BE_URL

export const parseGoogleSheetLink = async (link) => {
  try {
    const response = await axios.post(`${BE_URL}/sheet/getsheets`, { sheetLink: link }, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const parseSheetData = async (link, sheet) => {
  try {
    const response = await axios.post(`${BE_URL}/sheet/getsheetdata`, { sheetName: sheet, sheetLink: link }, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
