import React, { useState } from "react"
import PasswordIcon from "../Assets/PasswordIcon"
import EyeClosedIcon from "../Assets/EyeClosedIcon"
import EyeOpenIcon from "../Assets/EyeOpenIcon"

const PasswordField = ({ placeholder, setPassword }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  return (
    <div className="flex items-center border border-gray-700 rounded-md">
      <PasswordIcon className="w-8 h-8 ml-1" />
      <input onChange={(e) => setPassword(e.target.value)} className="px-2 py-1.5 w-full rounded-md bg-transparent focus:outline-none" type={isPasswordHidden ? "password" : "text"} placeholder={placeholder} />
      {isPasswordHidden ? (
        <EyeClosedIcon
          className="w-6 h-6 mr-2 cursor-pointer"
          onClick={() => {
            setIsPasswordHidden((prev) => !prev)
          }}
        />
      ) : (
        <EyeOpenIcon
          className="w-6 h-6 mr-2 cursor-pointer"
          onClick={() => {
            setIsPasswordHidden((prev) => !prev)
          }}
        />
      )}
    </div>
  )
}

export default PasswordField
