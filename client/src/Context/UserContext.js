import React, { createContext, useState, useContext } from "react"
import { getUser, loginUser, logOutUser, setUserPassword } from "../App/Services/UserServices"
import { loginUserUsingGoogle, signUpUserUsingGoogle } from "../App/Services/AuthServices"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  const userFetch = async () => {
    const res = await getUser()
    if (!res) return
    if (res.success) {
      setUser(res.data)
      user && toast.success(`Welcome ${res.data.name}`)
      navigate("/")
    }
  }

  const userLogin = async (email, password) => {
    const res = await loginUser(email, password)
    if (res.success) {
      console.log(res.data)
      setUser(res.data)
      toast.success("Logged In Successfully..")
      navigate("/")
    } else {
      toast.error(res.message)
    }
  }

  const userLogOut = async () => {
    const res = await logOutUser()
    if (res.success) {
      setUser(null)
      toast.success("User logged out")
      navigate("/auth")
    } else {
      toast.error(res.message)
    }
  }

  const setPasswordForUser = async (password) => {
    const res = await setUserPassword(password)
    if (res.success) {
      setUser(res.data)
      toast.success(res.message)
      navigate("/")
    } else {
      toast.error(res.message)
      return
    }
  }

  const googleLogin = async () => {
    const response = await loginUserUsingGoogle()
    window.open(response, "_self")
  }
  const googleSignUp = async () => {
    const response = await signUpUserUsingGoogle()
    window.open(response, "_self")
  }

  return <AuthContext.Provider value={{ user, userFetch, userLogin, userLogOut, setPasswordForUser, googleLogin, googleSignUp }}>{children}</AuthContext.Provider>
}

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext)
