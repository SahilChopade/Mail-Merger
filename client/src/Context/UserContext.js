import React, { createContext, useState, useContext } from "react"
import { getUser, loginUser, logOutUser, setUserPassword } from "../App/Services/UserServices"
import { loginUserUsingGoogle } from "../App/Services/AuthServices"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  const userFetch = async () => {
    const res = await getUser()
    if (res.success) {
      setUser(res.data)
      if (res.data.isPasswordSet) {
        navigate("/tools")
      } else {
        toast.info(`Welcome ${res.data.name.split(' ')[0]},Yet to Set Password..`)
        navigate("/auth/password")
      }
    }
  }

  const userLogin = async (email, password) => {
    const res = await loginUser(email, password)
    if (res.success) {
      console.log(res.data)
      setUser(res.data)
      toast.success("Logged In Successfully..")
      navigate("/tools")
    } else {
      toast.error(res.message)
    }
  }

  const userLogOut = async () => {
    const res = await logOutUser()
    if (res.success) {
      setUser(null)
      toast.success("User logged out")
      navigate("/auth/login")
    } else {
      toast.error(res.message)
    }
  }

  const setPasswordForUser = async (password) => {
    const res = await setUserPassword(password)
    if (res.success) {
      setUser(res.data)
      toast.success(res.message)
      navigate("/tools")
    } else {
      toast.error(res.message)
      return
    }
  }

  const googleLogin = async () => {
    const response = await loginUserUsingGoogle()
    window.open(response, "_self")
  }

  return <AuthContext.Provider value={{ user, userFetch, userLogin, userLogOut, setPasswordForUser, googleLogin }}>{children}</AuthContext.Provider>
}

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext)
