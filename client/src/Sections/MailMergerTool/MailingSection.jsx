import React, { useEffect, useState } from "react"
import { fetchDraftsList } from "../../App/Services/MailServices"
import { toast } from "react-toastify"
import { getDraftsInRequiredFormat } from "../../Utils/utils"

const MailingSection = () => {
  const [draftId, setDraftId] = useState("")
  const [draftsList, setDraftsList] = useState([])
  useEffect(() => {
    const getDrafts = async () => {
      const response = await fetchDraftsList()
      if (response?.success) {
        const draftData = getDraftsInRequiredFormat(response.data)
        if (!draftData.length) setDraftId(draftData[0]?.id)
        setDraftsList(draftData)
      } else {
        toast.error("Unable to fetch Drafts.")
      }
    }
    getDrafts()
  }, [])
  return (
    <div className="flex flex-col items-center justify-between gap-6 h-[450px] border border-slate-800 p-4 py-2 bg-[#afd0ee] rounded-lg">
      <img className="w-48 rounded-lg" src="/Assets/DraftSendPic.png" alt="image" />
      <div className="flex flex-col items-center gap-2">
        <div className="font-semibold font-noto w-full">Select Draft to Send Mails</div>
        <select onChange={(e) => setDraftId(e.target.value)} className="cursor-pointer w-full px-2 py-1.5 bg-transparent focus:outline-none border border-black rounded-md">
          {draftsList?.length === 0 && <option>Select Draft</option>}
          {draftsList?.map((draft, idx) => {
            return (
              <option className="" key={idx} value={draft?.id}>
                <div className="">{draft?.subject}</div>
                <div className="text-[8px]">{(draft?.size / 1000).toFixed(2)} Kb</div>
              </option>
            )
          })}
        </select>
        <div className="w-[20rem] text-center">Please select a draft to send emails to all the addresses listed in the previous section. </div>
      </div>
      <div class="w-full bg-transparent items-center rounded-md justify-center flex border-2 border-[#db569f] shadow-lg hover:bg-[#db569f] text-[#db569f] hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
        <button class="px-2 py-1.5">Start Mail Merge</button>
      </div>
    </div>
  )
}

export default MailingSection
