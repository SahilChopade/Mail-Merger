import React, { useEffect, useState } from "react"
import { useAuth } from "../Context/UserContext"
import MenuIcon from "../Assets/MenuIcon"
import AccountPopup from "../Components/AccountPopup"

const NavbarSection = () => {
  const { user } = useAuth()
  const [isAccountCardOpen, setIsAccountCardOpen] = useState(false)
  return (
    <div className="flex w-full justify-between">
      <div className="font-saira text-5xl">ToolKit</div>
      {user && <div className="relative group transition-all duration-300 ease-in-out" onMouseEnter={() => setIsAccountCardOpen(true)} onMouseLeave={() => setIsAccountCardOpen(false)}>
        <button className="bg-[#27344f] rounded-3xl p-1 flex items-center gap-2">
          <img className="rounded-[100%] object-contain w-8 h-8" src={user?.image} alt="Pic" />
          <div className="text-white whitespace-nowrap hidden group-hover:inline-flex">{user?.name}</div>
          <div className="bg-white rounded-[100%] w-8 h-8 flex items-center justify-center">
            <MenuIcon className="w-6" />
          </div>
        </button>
        {isAccountCardOpen && <AccountPopup />}
      </div>}
    </div>
  )
}

export default NavbarSection