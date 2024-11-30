import React, { useEffect, useState } from "react"
import SheetsParseSection from "../Sections/MailMergerTool/SheetsParseSection"
import MailingSection from "../Sections/MailMergerTool/MailingSection"
import SheetDataSection from "../Sections/MailMergerTool/SheetDataSection"

const MailMerger = () => {
  const [companyEmailData, setCompanyEmailData] = useState([])
  const [step, setStep] = useState(1)
  const getStepComponent = () => {
    switch (step) {
      case 1:
        return <SheetsParseSection setCompanyEmailData={setCompanyEmailData} setStep={setStep} />
      case 2:
        return <SheetDataSection companyEmailData={companyEmailData} setStep={setStep} />
      case 3:
        return <MailingSection companyEmailData={companyEmailData} setStep={setStep} />
      default:
        return <></>
    }
  }
  return (
    <div className="h-full flex items-center justify-center gap-10 relative">
      {step > 1 && <SheetsParseSection setCompanyEmailData={setCompanyEmailData} setStep={setStep} />}
      {step > 2 && <SheetDataSection companyEmailData={companyEmailData} setStep={setStep} />}
      {step > 3 && <MailingSection companyEmailData={companyEmailData} setStep={setStep} />}
      {step < 4 && (
        <div className="absolute top-0 left-0 rounded-2xl bg-[#1F509A]/80 w-full h-full flex items-center justify-center">
          <div className="w-fit">{getStepComponent()}</div>
        </div>
      )}
    </div>
  )
}

export default MailMerger
