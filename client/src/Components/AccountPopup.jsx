import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../Context/UserContext"
import LogoutIcon from "../Assets/LogoutIcon"
import ProfileIcon from "../Assets/ProfileIcon"
import ChangePasswordIcon from "../Assets/ChangePasswordIcon"
const AccountPopup = () => {
  const { userLogOut } = useAuth()
  const handleUserLogOut = () => {
    userLogOut()
  }
  return (
    <div className="w-full flex flex-col justify-center gap-1 rounded-xl bg-[#27344f] p-1 text-white absolute top-[100%]">
      <button className="flex items-center justify-start gap-2 hover:bg-slate-500 p-2 rounded-xl">
        <ProfileIcon className="w-5 h-5" />
        <div>Profile</div>
      </button>
      <button className="flex items-center justify-start gap-2 hover:bg-slate-500 p-2 rounded-xl">
        <ChangePasswordIcon className="w-5 h-5" />
        <div>Change Password</div>
      </button>
      <button className="flex items-center justify-start gap-2 hover:bg-slate-500 p-2 rounded-xl" onClick={handleUserLogOut}>
        <LogoutIcon className="w-5 h-5" /> <div>LogOut</div>
      </button>
    </div>
  )
}

export default AccountPopup
