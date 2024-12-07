import React, { useEffect, useState } from "react"
import SheetsParseSection from "../Sections/MailMergerTool/SheetsParseSection"
import MailingSection from "../Sections/MailMergerTool/MailingSection"
import SheetDataSection from "../Sections/MailMergerTool/SheetDataSection"
import StepsNav from "../Sections/StepsNav"
import SheetSelectSection from "../Sections/MailMergerTool/SheetSelectSection"

const MailMerger = () => {
  const [companyEmailData, setCompanyEmailData] = useState([])
  const [step, setStep] = useState(1)
  const [sheetLink, setSheetLink] = useState("")
  const [sheetsList, setSheetsList] = useState([])
  const [sheetName, setSheetName] = useState("")

  const getStepComponent = () => {
    switch (step) {
      case 1:
        return <SheetsParseSection {...{ sheetLink, setSheetLink, setSheetsList, setStep }} />
      case 2:
        return <SheetSelectSection {...{ sheetsList, sheetLink, sheetName, setSheetName, setCompanyEmailData, setStep }} />
      case 3:
        return <MailingSection {...{companyEmailData,setStep}} />
      default:
        return <></>
    }
  }
  return (
    <div className="h-full flex items-center">
      <StepsNav curStep={step} />
      <div className="w-[1px] mr-20 h-3/4 bg-black"></div>
      <div className="w-full">{getStepComponent()}</div>
    </div>
  )
}

export default MailMerger
