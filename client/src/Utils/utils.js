export const extractId = (cookie) => {
  const match = cookie.match(/j:"([^"]+)"/)
  return match ? match[1] : null
}

export const getDraftsInRequiredFormat = (data) => {
  const requiredFormat = data?.map((draft) => {
    const draftId = draft.id
    const size = draft?.message?.sizeEstimate || 0
    const headers = draft?.message?.payload?.headers
    const subjectHeader = headers.find((header) => header.name.toLowerCase() === "subject")
    const subject = subjectHeader ? subjectHeader.value : "No Subject"

    return { draftId, subject, size }
  })
  return requiredFormat
}
