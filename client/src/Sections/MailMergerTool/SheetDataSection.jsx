import React, { useEffect, useState } from "react"
import DataIcon from "../../Assets/DataIcon"
const EmptyDataState = ({ setStep }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-6 text-center h-[450px] border border-slate-800 p-4 py-2 bg-[#afd0ee] rounded-lg">
      <DataIcon className="w-48 bg-black" />
      <div className="flex flex-col items-center gap-3">
        <div className="font-noto font-semibold text-xl">OOP's! No Data Found....</div>
        <div className="w-[20rem]">Please try again with a new sheet or attempt to refetch the data for the same sheet by navigating back.</div>
      </div>
    </div>
  )
}

const SheetDataSection = ({ companyEmailData, setStep }) => {
  const [headers, setHeaders] = useState([])
  useEffect(() => {
    if (!companyEmailData.length) return
    const data = Object.keys(companyEmailData[0])
    setHeaders(data)
  }, [companyEmailData])
  return companyEmailData.length ? (
    <div className="flex flex-col gap-6 h-[450px] border border-slate-800 p-4 py-2 rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-2 bg-[#afd0ee] font-semibold rounded-t-lg sticky top-0">
          {headers?.map((head, idx) => {
            return (
              <div className="flex capitalize px-2 py-1" key={idx} style={{ width: `${100 / headers.length}%` }}>
                {head}
              </div>
            )
          })}
        </div>
        <div className="bg-[#afd0ee]  max-h-[300px] overflow-auto">
          {companyEmailData?.map((data, idx) => {
            return (
              <div className="grid grid-cols-2 border-t border-gray-300" key={idx}>
                {headers?.map((head, idx1) => {
                  return (
                    <div className="flex px-2 py-1" key={idx1} style={{ width: `${100 / headers.length}%` }}>
                      {data[head]}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <div>The above table shows the data going to be used to send emails.</div>
    </div>
  ) : (
    <EmptyDataState setStep={setStep} />
  )
}

export default SheetDataSection
