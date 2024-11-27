import React, { useState } from "react"
import PasswordField from "../Components/PasswordField"
import LoginIcon from "../Assets/LoginIcon"

const PasswordSection = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  return (
    <div className="font-[Quantico] flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="text-sm opacity-80">Just one step to secure your account,</div>
        <div className="text-5xl font-semibold tracking-tighter">Set Password!</div>
      </div>
      <div className="flex flex-col gap-2 font-[Merriweather]">
        <PasswordField placeholder="Enter Password" setPassword={setPassword} />
        <PasswordField placeholder="Confirm Password" setPassword={setConfirmPassword} />
      </div>
      <button className="bg-[#db569f] rounded-xl w-full py-2.5 text-white flex items-center justify-center gap-2">
        <LoginIcon className="w-5 h-5" /> <div>Submit & Explore</div>
      </button>
    </div>
  )
}

export default PasswordSection
