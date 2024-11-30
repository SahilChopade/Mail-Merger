import React, { useState } from "react"
import GoogleSheetIcon from "../../Assets/GoogleSheetIcon"
import { parseGoogleSheetLink, parseSheetData } from "../../App/Services/SheetServices"
import { toast } from "react-toastify"
import DownArrowAnimation from "../../Components/DownArrowAnimation"

const SheetsParseSection = ({ setCompanyEmailData, setStep }) => {
  const [sheetLink, setSheetLink] = useState("")
  const [sheetsList, setSheetsList] = useState([])
  const [sheetName, setSheetName] = useState("")

  const handleSheetDataParse = async () => {
    const response = await parseSheetData(sheetLink, sheetName)
    if (response?.success) {
      setStep((prev) => prev + 1)
      toast.success("Data Parsed Successfully")
      setCompanyEmailData(response?.data)
    } else {
      toast.error("Unable to Parse Sheet Data!")
      return
    }
  }

  const handleSheetsListFetch = async () => {
    const response = await parseGoogleSheetLink(sheetLink)
    if (response?.success) {
      toast.success("Sheets Fetched Successfully")
      setSheetsList(response?.data)
    } else {
      toast.error("Unable to Fetch Data!")
      return
    }
  }
  return (
    <div className="flex flex-col gap-10 h-[450px] border border-slate-800 p-4 py-2 bg-[#afd0ee] rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="font-noto font-bold">Provide Sheet Link</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-700 rounded-md">
            <GoogleSheetIcon className="w-6 h-6 ml-1" />
            <input onChange={(e) => setSheetLink(e.target.value)} className="px-2 py-1.5 w-full rounded-md bg-transparent focus:outline-none placeholder:text-black/70" type="text" placeholder="Enter your Email" />
          </div>
          <div class="max-w-32 bg-transparent items-center rounded-md justify-center flex border-2 border-[#db569f] shadow-lg hover:bg-[#db569f] text-[#db569f] hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
            <button onClick={handleSheetsListFetch} class="px-2 py-1.5">
              Fetch Data
            </button>
          </div>
        </div>
      </div>
      <DownArrowAnimation />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>Select Sheet to Parse</div>
          <select onChange={(e) => setSheetName(e.target.value)} className="cursor-pointer w-full px-2 py-1.5 bg-transparent focus:outline-none border border-black rounded-md">
            <option>Select Sheet</option>
            {sheetsList?.map((name, idx) => {
              return (
                <option key={idx} value={name}>
                  {name}
                </option>
              )
            })}
          </select>
        </div>
        <div class="bg-transparent items-center rounded-md justify-center flex border-2 border-[#db569f] shadow-lg hover:bg-[#db569f] text-[#db569f] hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button onClick={handleSheetDataParse} class="px-2 py-1.5">
            Parse Sheet
          </button>
        </div>
      </div>
    </div>
  )
}

export default SheetsParseSection
