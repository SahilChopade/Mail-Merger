import React, { useEffect, useState } from "react"
import NavbarSection from "../Sections/NavbarSection"
import ToolsPage from "./ToolsPage"
import { useAuth } from "../Context/UserContext"
import { Route, Routes } from "react-router-dom"
import MailMerger from "./MailMergerPage"
const HomePage = () => {
  const { user, userFetch } = useAuth()
  useEffect(() => {
    userFetch()
  }, [])
  return (
    <div className="flex flex-col gap-1 h-full">
      <NavbarSection />
      <Routes>
        <Route path="/" element={user ? <ToolsPage /> : <button>Login</button>} />
        <Route path="/mailmerger" element={<MailMerger />} />
      </Routes>
    </div>
  )
}

export default HomePage
