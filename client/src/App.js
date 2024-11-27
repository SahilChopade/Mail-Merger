import React from "react"
import "./App.css"
import AuthorizationPage from "./Pages/AuthorizationPage"

const App = () => {
  return (
    <div className="bg-[#afd0ee] w-[100dvw] h-[100dvh] p-8 text-black">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f1f8ff] from-10% to-[#ddeeff] to-70% w-full h-full rounded-3xl p-4">
        <AuthorizationPage />
      </div>
    </div>
  )
}

export default App
