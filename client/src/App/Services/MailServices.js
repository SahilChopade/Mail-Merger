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
export const sendMassMails = async ({ companyEmailData, draftId }) => {
  try {
    const response = await axios.post(`${BE_URL}/mail/sendmails`, { companyEmailData: companyEmailData, draftId: draftId }, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
