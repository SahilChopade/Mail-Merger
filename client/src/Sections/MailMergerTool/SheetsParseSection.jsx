import React, { useState } from "react"
import GoogleSheetIcon from "../../Assets/GoogleSheetIcon"
import { parseGoogleSheetLink } from "../../App/Services/SheetServices"
import { toast } from "react-toastify"
import Button from "../../Components/Button"

const SheetsParseSection = ({ sheetLink, setSheetLink, setSheetsList, setStep }) => {
  const handleSheetsListFetch = async () => {
    const response = await parseGoogleSheetLink(sheetLink)
    if (response?.success) {
      toast.success("Sheets Fetched Successfully")
      setSheetsList(response?.data)
      setStep((prev) => prev + 1)
    } else {
      toast.error("Unable to Fetch Data!")
      return
    }
  }
  return (
    <div className="flex flex-col gap-5 w-full p-4 py-2 rounded-lg">
      <div className="font-noto font-bold text-3xl">Provide Sheet Link</div>
      <div className="flex items-center gap-5">
        <div className="flex items-center border border-gray-700 rounded-md w-1/2">
          <GoogleSheetIcon className="w-8 h-8 ml-1" />
          <input onChange={(e) => setSheetLink(e.target.value)} className="px-2 py-1.5 w-full rounded-md bg-transparent focus:outline-none placeholder:text-black/70 text-xl" type="text" placeholder="Enter your Email" />
          <Button classes="max-w-32" name="Fetch Data" clickHandler={handleSheetsListFetch} />
        </div>
      </div>
    </div>
  )
}

{
}

export default SheetsParseSection
