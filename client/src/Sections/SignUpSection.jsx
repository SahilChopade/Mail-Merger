import React, { useState } from "react"
import LoginIcon from "../Assets/LoginIcon"
import MailIcon from "../Assets/MailIcon"
import PasswordIcon from "../Assets/PasswordIcon"
import GoogleIcon from "../Assets/GoogleIcon"
import IdCardIcon from "../Assets/IdCardIcon"
import EyeOpenIcon from "../Assets/EyeOpenIcon"
import EyeClosedIcon from "../Assets/EyeClosedIcon"
import { Link } from "react-router-dom"

const SignUpSection = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  return (
    <div className="font-[Quantico] flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="text-sm opacity-80">Hello, you wanna</div>
        <div className="text-5xl font-semibold tracking-tighter">Get Started!</div>
      </div>
      <div className="flex flex-col gap-2 font-[Merriweather]">
        <div className="flex items-center border border-gray-700 rounded-md">
          <IdCardIcon className="w-8 h-8 ml-1" />
          <input className="px-2 py-1.5 w-full rounded-md bg-transparent focus:outline-none" type="text" placeholder="Enter your Name" />
        </div>
        <div className="flex items-center border border-gray-700 rounded-md">
          <MailIcon className="w-8 h-8 ml-1" />
          <input className="px-2 py-1.5 w-full rounded-md bg-transparent focus:outline-none" type="email" placeholder="Enter your Email" />
        </div>
        <div className="flex items-center border border-gray-700 rounded-md">
          <PasswordIcon className="w-8 h-8 ml-1" />
          <input className="px-2 py-1.5 w-full rounded-md bg-transparent focus:outline-none" type={isPasswordHidden ? "password" : "text"} placeholder="Enter your Password" />
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
      </div>
      <button className="bg-[#db569f] rounded-xl w-full py-2.5 text-white flex items-center justify-center gap-2">
        <LoginIcon className="w-5 h-5" /> <div>Sign Up</div>
      </button>
      <div className="flex items-center gap-1">
        <hr className="w-full text-black" />
        OR
        <hr className="w-full text-black" />
      </div>
      <div className="bg-slate-200 hover:bg-slate-400 cursor-pointer rounded-3xl border border-black w-full py-2.5 flex items-center justify-center gap-2 transition-all duration-150">
        <GoogleIcon className="w-6 h-6" />
        <div>Sign Up with Google</div>
      </div>
      <div className="flex items-center gap-1">
        <div>Already Have an Account?</div> <Link to="/auth/login">Login Here</Link>
      </div>
    </div>
  )
}

export default SignUpSection
