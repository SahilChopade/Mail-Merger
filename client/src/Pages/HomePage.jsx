import React, { useEffect } from "react"
import NavbarSection from "../Sections/NavbarSection"
import ToolsPage from "./ToolsPage"
import { useAuth } from "../Context/UserContext"
const HomePage = () => {
  const { user, userFetch } = useAuth()
  useEffect(() => {
    userFetch()
  }, [])
  return (
    <div className="flex flex-col gap-1">
      <NavbarSection />
      {user ? <ToolsPage /> : <button>Login</button>}
    </div>
  )
}

export default HomePage
