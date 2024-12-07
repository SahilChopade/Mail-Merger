import React from "react"
import LoginSection from "../Sections/LoginSection"

const AuthorizationPage = () => {
  return (
    <div className={`flex items-center h-full transition-all duration-200`}>
      <video autoPlay loop muted className="h-[calc(100dvh-6rem)] rounded-3xl">
        <source src="/Assets/HomePageGif.mp4" type="video/mp4" />
      </video>
      <div className="flex items-center justify-center w-full">
        <LoginSection />
      </div>
    </div>
  )
}

export default AuthorizationPage
