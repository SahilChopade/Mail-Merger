import axios from "axios"
const BE_URL = process.env.REACT_APP_BE_URL

export const loginUserUsingGoogle = async () => {
  try {
    const response = await axios.get(`${BE_URL}/api/auth`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
