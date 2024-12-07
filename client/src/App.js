import React from "react"
import "./App.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AuthorizationPage from "./Pages/AuthorizationPage"
import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"

const App = () => {
  return (
    <div className="bg-[#afd0ee] w-[100dvw] h-[100dvh] p-3 text-black">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f1f8ff] from-10% to-[#ddeeff] to-70% w-full h-full rounded-3xl p-4">
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/auth" element={<AuthorizationPage />} />
        </Routes>
      </div>
      <ToastContainer  />
    </div>
  )
}

export default App
