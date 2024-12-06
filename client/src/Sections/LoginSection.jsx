import React, { useEffect } from "react"
import GoogleIcon from "../Assets/GoogleIcon"
import { useAuth } from "../Context/UserContext"

const LoginSection = () => {
  const { userFetch, googleLogin,googleSignUp } = useAuth()
  useEffect(() => {
    userFetch()
  }, [])
  return (
    <div className="font-[Quantico] flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="text-sm opacity-80">Login your account</div>
        <div className="text-5xl font-semibold tracking-tighter">Welcome Back!</div>
        <div className="text-base opacity-80">Enter your email and password</div>
      </div>

      <div onClick={googleLogin} className="bg-slate-200 hover:bg-slate-400 hover:shadow-[0_0_8px_#94a3b8,0_0_16px_#94a3b8,0_0_22px_#94a3b8] cursor-pointer rounded-3xl border border-black w-full py-2.5 flex items-center justify-center gap-2 transition-all duration-150">
        <GoogleIcon className="w-6 h-6" />
        <div>Login with Google</div>
      </div>
      <div className="flex items-center gap-1">
        <hr className="w-full border-black" />
        OR
        <hr className="w-full border-black" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm opacity-80">Hello, you wanna</div>
        <div className="text-5xl font-semibold tracking-tighter">Get Started!</div>
      </div>
      <div onClick={googleSignUp} className="bg-slate-200 hover:bg-slate-400 hover:shadow-[0_0_8px_#94a3b8,0_0_16px_#94a3b8,0_0_22px_#94a3b8] cursor-pointer rounded-3xl border border-black w-full py-2.5 flex items-center justify-center gap-2 transition-all duration-150">
        <GoogleIcon className="w-6 h-6" />
        <div>Sign Up with Google</div>
      </div>
    </div>
  )
}

export default LoginSection
