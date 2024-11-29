import React from "react"
import GetStartedIcon from "../Assets/GetStartedIcon"

const ToolCard = (props) => {
  return (
    <div className="flex flex-col items-center gap-4 transition-all duration-100 bg-[#171b26] text-white rounded-2xl border-2 p-8 border-slate-500 w-1/4">
      <div>
        <img className="w-[240px]" src={`/Assets/Tools/${props?.image}`} alt={props?.title} />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="text-3xl font-semibold font-[Quantico]">{props?.title}</div>
        <div className="text-ellipsis opacity-75">{props?.description}</div>
      </div>
      <div className="flex items-center justify-between w-full">
        <button className="text-[#72ffcb] hover:scale-125 transition-all duration-200">Learn More {">"}</button>
        <button className="flex items-center gap-2 py-2.5 px-1.5 rounded-[6px] border border-blue-700 text-blue-700">
          <GetStartedIcon className="w-5 h-5 text-white" />
          <div className="">Get Started</div>
        </button>
      </div>
    </div>
  )
}

export default ToolCard
