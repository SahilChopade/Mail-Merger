import React from "react"

const StepBox = ({ stepData, curStep }) => {
  return (
    <div className={`font-noto border-4 border-gray-600 p-3 text-black w-32 aspect-square rounded-lg flex flex-col gap-2 items-center justify-center ${curStep >= stepData?.number && "bg-[#db569f] border-pink-800 shadow-[0_0_8px_#9d174d,0_0_16px_#9d174d,0_0_22px_#9d174d] text-white"}`}>
      <div className="font-bold text-3xl">{`0${stepData?.number}`}</div>
      <div className="font-medium text-base">{stepData?.title}</div>
    </div>
  )
}

export default StepBox
