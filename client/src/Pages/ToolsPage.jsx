import React from "react"
import { useAuth } from "../Context/UserContext"

const ToolsPage = () => {
  const { userLogOut } = useAuth()
  const handleUserLogOut = () => {
    userLogOut()
  }
  return (
    <div className="flex w-full justify-between">
      <div>Tools</div>
      <div>
        <button onClick={handleUserLogOut}>Logout</button>
      </div>
    </div>
  )
}

export default ToolsPage
