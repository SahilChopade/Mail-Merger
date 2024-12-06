import React from "react"
import StepBox from "../Components/StepBox"

const stepsData = [
  { number: 1, title: "Sheet Link", description: "Fetching all the Sheets from the given link." },
  { number: 2, title: "Select Sheet", description: "Select the Sheet from which you want to parse data." },
  { number: 3, title: "Mailing", description: "Start Mail-Merge for all the data shown." },
]

const StepsNav = ({curStep}) => {
  return (
    <div className="h-full mx-20 w-fit p-5 flex flex-col gap-5 items-center justify-center">
      {stepsData?.map((item, idx) => {
        return <StepBox key={idx} stepData={item} curStep={curStep}/>
      })}
    </div>
  )
}

export default StepsNav
