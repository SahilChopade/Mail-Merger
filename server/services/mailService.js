const nodemailer = require("nodemailer")

function processArray(lines) {
  let result = ""
  for (let i = 0; i < lines.length; i++) {
    const current = lines[i]
    const next = lines[i + 1] || ""
    if (current === "") {
      result += "\n"
    } else if (current.endsWith(" ")) {
      result += current + next
    } else {
      result += current + "\n"
    }
  }
  return result.trim()
}

function getPersonalizedSubject(draft, company) {
  const originalSubject = draft.payload.headers.filter((item) => item.name === "Subject")[0].value
  const updatedSubject = originalSubject.replace("{{Company}}", company.companyName)
  return updatedSubject
}
function getPersonalizedBody(draft, company) {
  const bodyPart = draft.payload.parts[0].parts.find((part) => part.mimeType === "text/plain")
  const originalBody = bodyPart ? Buffer.from(bodyPart.body.data, "base64").toString("utf8") : ""
  const updatedBody = originalBody.replace("{{Company}}", company.companyName)
  const lines = updatedBody.split(/\r\n|\n|\r/)
  return processArray(lines)
}
function getAttachmentsForMail(draft) {
  const attachments = draft.payload.parts.slice(1).map((part) => {
    return {
      mimeType: part.mimeType,
      filename: part.filename,
      content: part.body.attachmentId, // Here, we use the attachmentId to fetch the attachment content
      size: part.body.size,
    }
  })
  return attachments
}
async function createRawMessage(email, subject, messageBody, attachments, user) {
  const attachmentsFormatted = attachments.map((item) => {
    return {
      filename: item.filename,
      content: item.content,
      encoding: "base64", // Ensure it's base64 encoded
      contentType: item.mimeType,
    }
  })
  const mailOptions = {
    from: `${user.displayName} <${user.email}>`,
    to: email,
    subject: subject,
    text: messageBody,
    attachments: attachmentsFormatted,
  }
  return mailOptions
}

async function sendMailUsingNodemailer(rawMessage, token, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: email,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: token,
    },
  })
  const data = await transporter.sendMail(rawMessage)
  return data
}

module.exports = { getPersonalizedSubject, getPersonalizedBody, getAttachmentsForMail, createRawMessage, sendMailUsingNodemailer }
