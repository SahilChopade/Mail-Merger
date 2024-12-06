import axios from "axios"
import { toast } from "react-toastify"
const BE_URL = process.env.REACT_APP_BE_URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BE_URL}/user/login`, { email: email, password: password }, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

export const logOutUser = async () => {
  try {
    const response = await axios.get(`${BE_URL}/user/logout`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${BE_URL}/user/getUser`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

export const setUserPassword = async (password) => {
  try {
    const response = await axios.post(`${BE_URL}/user/password`, { password: password }, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}
