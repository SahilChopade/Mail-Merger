const axios = require("axios")
const mailService = require("../services/mailService")
const { decodeBase64Url, encodeBase64Url } = require("../utils/utils")
const { transporter } = require("../services/transporter")

const draftId = "r6835462327113036219"
async function getDraftsList(req, res) {
  try {
    const draftResponse = await axios.get(`${process.env.MAIL_ENDPOINT}/me/drafts`, {
      headers: {
        Authorization: `Bearer ${req.oAuth2.credentials.access_token}`,
      },
    })
    if (draftResponse) {
      res.send({ success: true, data: draftResponse.data.drafts })
    } else {
      res.send({ success: false, message: "Can't Fetch Drafts List. Try Again!!" })
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data from Gmail." })
  }
}

async function sendMassMail(req, res) {
  try {
    // Fetch draft message
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
          const sendInfo = await transporter.sendMail(rawMessage)
          console.log(`Email sent to ${item.email}: ${sendInfo.response}`)
        } catch (sendError) {
          console.error(`Failed to send email to ${item.email}:`, sendError)
          return res.status(500).send({ success: false, message: `Failed to send email to ${item.email}` })
        }
      } catch (personalizationError) {
        console.error(`Error personalizing email for ${item.email}:`, personalizationError)
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
