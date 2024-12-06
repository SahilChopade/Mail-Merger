import React, { useEffect, useState } from "react"
import { fetchDraftsList, sendMassMails } from "../../App/Services/MailServices"
import { toast } from "react-toastify"
import { getDraftsInRequiredFormat } from "../../Utils/utils"
import SheetDataSection from "./SheetDataSection"
import Button from "../../Components/Button"
import { useNavigate } from "react-router-dom"

const MailingSection = ({ companyEmailData, setStep }) => {
  const [draftId, setDraftId] = useState("")
  const [draftsList, setDraftsList] = useState([])
  const navigate = useNavigate()
  const handleMailMerge = async () => {
    const response = await sendMassMails({ companyEmailData, draftId })
    if (response?.success) {
      toast.success("Mails Sent Successfully..")
      navigate("/")
    } else {
      toast.error(response?.message)
    }
  }

  useEffect(() => {
    const getDrafts = async () => {
      const response = await fetchDraftsList()
      if (response?.success) {
        const draftData = getDraftsInRequiredFormat(response.data)
        if (draftData.length) setDraftId(draftData[0].draftId)
        setDraftsList(draftData)
      } else {
        toast.error("Unable to fetch Drafts.")
      }
    }
    getDrafts()
  }, [])
  return (
    <div className="flex items-center gap-4 font-noto">
      <SheetDataSection {...{ companyEmailData, setStep }} />
      <div className="flex flex-col items-center justify-between gap-6 h-[450px] border border-slate-800 p-4 py-2 rounded-lg overflow-hidden">
        <img className="w-48 rounded-lg" src="/Assets/DraftSendPic.png" alt="image" />
        <div className="flex flex-col items-center gap-2">
          <div className="font-semibold font-noto w-full">Select Draft to Send Mails</div>
          <select onChange={(e) => setDraftId(e.target.value)} className="cursor-pointer w-full px-2 py-1.5 bg-transparent focus:outline-none border border-black rounded-md text-sm">
            {draftsList?.length === 0 && <option>Select Draft</option>}
            {draftsList?.map((draft, idx) => {
              return (
                <option key={idx} value={draft?.id}>
                  <div>{draft?.subject}</div>
                  <div className="text-[4px]">{(draft?.size / 1000).toFixed(2)} Kb</div>
                </option>
              )
            })}
          </select>
          <div className="w-[20rem] text-center">Please select a draft to send emails to all the addresses listed in the previous section. </div>
        </div>
        <Button classes="w-full" name="Start Mail Merge" clickHandler={handleMailMerge} />
      </div>
    </div>
  )
}

export default MailingSection
