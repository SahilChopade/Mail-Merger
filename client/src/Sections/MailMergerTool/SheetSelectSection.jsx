import React from "react"
import { toast } from "react-toastify"
import { parseSheetData } from "../../App/Services/SheetServices"
import Button from "../../Components/Button"

const SheetSelectSection = ({ sheetsList, sheetLink, sheetName, setSheetName, setCompanyEmailData, setStep }) => {
  const handleSheetDataParse = async () => {
    const response = await parseSheetData(sheetLink, sheetName)
    if (response?.success) {
      toast.success("Data Parsed Successfully")
      setCompanyEmailData(response?.data)
      setStep((prev) => prev + 1)
    } else {
      toast.error("Unable to Parse Sheet Data!")
      return
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="font-noto font-bold text-3xl">Select Sheet to Parse</div>
      <div className="flex items-center gap-2 w-3/4 text-2xl">
        <select onChange={(e) => setSheetName(e.target.value)} className="cursor-pointer text-xl w-3/4 px-2 py-1.5 bg-transparent focus:outline-none border border-black rounded-md">
          <option>Select Sheet</option>
          {sheetsList?.map((name, idx) => {
            return (
              <option key={idx} value={name}>
                {name}
              </option>
            )
          })}
        </select>
        <Button classes="w-1/4" name="Parse Sheet" clickHandler={handleSheetDataParse} />
      </div>
      {/* <div class="bg-transparent items-center rounded-md justify-center flex border-2 border-[#db569f] shadow-lg hover:bg-[#db569f] text-[#db569f] hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
        <button onClick={handleSheetDataParse} class="px-2 py-1.5">
          Parse Sheet
        </button>
      </div> */}
    </div>
  )
}

export default SheetSelectSection
