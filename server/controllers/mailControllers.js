const axios = require("axios")
const mailService = require("../services/mailService")

async function getDraftsList(req, res) {
  try {
    const draftsListResponse = await axios.get(`${process.env.MAIL_ENDPOINT}/me/drafts`, {
      headers: {
        Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
      },
    })
    const draftsList = draftsListResponse.data.drafts || []
    if (draftsList.length === 0) {
      return res.send({ success: true, message: "No Drafts Found!!" })
    }
    const fullDrafts = await Promise.all(
      draftsList.map(async (draft) => {
        const draftDetailResponse = await axios.get(`${process.env.MAIL_ENDPOINT}/me/drafts/${draft.id}?format=full`, {
          headers: {
            Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
          },
        })
        return draftDetailResponse.data
      })
    )
    res.send({ success: true, data: fullDrafts })
  } catch (error) {
    console.error("Error fetching drafts:", error)
    res.status(500).send({ success: false, message: "Failed to fetch drafts from Gmail." })
  }
}

async function sendMassMail(req, res) {
  try {
    // Fetch draft message
    const { draftId } = req.body
    const draftResponse = await axios.get(`${process.env.MAIL_ENDPOINT}/me/drafts/${draftId}?format=full`, {
      headers: {
        Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
      },
    })
    const draftMessage = draftResponse.data.message
    // Ensure companyEmailData is provided in request body
    const { companyEmailData } = req.body
    if (!companyEmailData || !Array.isArray(companyEmailData)) {
      return res.status(400).send({ success: false, message: "Invalid email data." })
    }

    // Iterate over the email data and send personalized emails
    for (const item of companyEmailData) {
      try {
        const subject = mailService.getPersonalizedSubject(draftMessage, item)
        const messageBody = mailService.getPersonalizedBody(draftMessage, item)
        const attachments = []
        // Fetch and add attachments to the email
        for (const part of draftMessage.payload.parts.slice(1)) {
          try {
            const attachmentResponse = await axios.get(`${process.env.MAIL_ENDPOINT}/me/messages/${draftMessage.id}/attachments/${part.body.attachmentId}`, {
              headers: {
                Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
              },
            })
            attachments.push({
              mimeType: part.mimeType,
              filename: part.filename,
              content: attachmentResponse.data.data, // Attachment content
              size: part.body.size,
            })
          } catch (attachmentError) {
            console.error(`Error fetching attachment for part ${part.filename}:`, attachmentError)
            return res.status(500).send({ success: false, message: "Failed to fetch attachments." })
          }
        }

        // Create the raw message for sending
        const rawMessage = await mailService.createRawMessage(item.email, subject, messageBody, attachments)

        // Send the email using transporter
        try {
          const sendInfo = await mailService.sendMailUsingNodemailer(rawMessage, req.oAuth2.credentials.refresh_token, req.user.email)
        } catch (sendError) {
          return res.status(500).send({ success: false, message: `Failed to send email to ${item.email}` })
        }
      } catch (personalizationError) {
        continue // Continue with the next email if personalization fails
      }
    }
    // Send success response after all emails are sent
    res.status(200).send({ success: true, message: "Mails sent successfully!" })
  } catch (error) {
    console.error("Error during mass email process:", error)
    res.status(500).send({ success: false, message: "Failed to send mails." })
  }
}

module.exports = { getDraftsList, sendMassMail }
