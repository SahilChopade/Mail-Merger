import React from "react"
import GetStartedIcon from "../Assets/GetStartedIcon"
import { useNavigate } from "react-router-dom"

const ToolCard = (props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center gap-4 transition-all duration-100 bg-[#171b26] text-white rounded-2xl border-2 p-8 border-slate-500 w-fit">
      <div>
        <img className="w-[240px]" src={`/Assets/Tools/${props?.image}`} alt={props?.title} />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="text-3xl font-semibold font-[Quantico]">{props?.title}</div>
        <div className="text-ellipsis opacity-75 w-[20rem]">{props?.description}</div>
      </div>
      <div className="flex items-center justify-between w-full">
        <button className="text-[#72ffcb] hover:scale-125 transition-all duration-200">Learn More {">"}</button>
        <button onClick={() => navigate("/mailmerger")} className="group flex items-center gap-2 py-2.5 px-1.5 rounded-[6px] hover:shadow-[0_0_8px_#1d4ed8,0_0_16px_#1d4ed8,0_0_22px_#1d4ed8] border border-blue-700 text-blue-700">
          <GetStartedIcon className="w-5 h-5 text-blue-700 group- hover:text-white" />
          <div className="">Get Started</div>
        </button>
      </div>
    </div>
  )
}

export default ToolCard
