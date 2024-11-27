import React from "react"
import LoginSection from "../Sections/LoginSection"
import SignUpSection from "../Sections/SignUpSection"
import { Route, Routes, useLocation } from "react-router-dom"

const AuthorizationPage = () => {
  const location = useLocation()

  return (
    <div className={`flex items-center h-full transition-all duration-200`}>
      <video autoPlay loop muted className="h-[calc(100dvh-6rem)] rounded-3xl">
        <source src="/Assets/HomePageGif.mp4" type="video/mp4" />
      </video>
      <div className="flex items-center justify-center w-full">
        <Routes>
          <Route path="/login" element={<LoginSection />} />
          <Route path="/signup" element={<SignUpSection />} />
        </Routes>
      </div>
    </div>
  )
}

export default AuthorizationPage
