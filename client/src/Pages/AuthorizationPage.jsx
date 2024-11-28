import React, { useEffect } from "react"
import LoginSection from "../Sections/LoginSection"
import SignUpSection from "../Sections/SignUpSection"
import { Route, Routes } from "react-router-dom"
import PasswordSection from "../Sections/PasswordSection"
import { useAuth } from "../Context/UserContext"

const AuthorizationPage = () => {
  const { userFetch } = useAuth()
  useEffect(() => {
    userFetch()
  }, [])
  return (
    <div className={`flex items-center h-full transition-all duration-200`}>
      <video autoPlay loop muted className="h-[calc(100dvh-6rem)] rounded-3xl">
        <source src="/Assets/HomePageGif.mp4" type="video/mp4" />
      </video>
      <div className="flex items-center justify-center w-full">
        <Routes>
          <Route path="/" element={<SignUpSection />} />
          <Route path="/login" element={<LoginSection />} />
          <Route path="/password" element={<PasswordSection />} />
        </Routes>
      </div>
    </div>
  )
}

export default AuthorizationPage
