import axios from "axios"
const BE_URL = process.env.REACT_APP_BE_URL

export const fetchDraftsList = async () => {
  try {
    const response = await axios.get(`${BE_URL}/mail/getdraftslist`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
