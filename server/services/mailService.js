function getPersonalizedSubject(draft, company) {
  const originalSubject = draft.payload.headers.filter((item) => item.name === "Subject")[0].value
  const updatedSubject = originalSubject.replace("{{Company}}", company.companyName)
  return updatedSubject
}
function getPersonalizedBody(draft, company) {
  const bodyPart = draft.payload.parts[0].parts.find((part) => part.mimeType === "text/plain")
  const originalBody = bodyPart ? Buffer.from(bodyPart.body.data, "base64").toString("utf8") : ""
  const updatedBody = originalBody.replace("{{Company}}", company.companyName)
  return updatedBody
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
async function createRawMessage(email, subject, messageBody, attachments) {
  const attachmentsFormatted = attachments.map((item) => {
    return {
      filename: item.filename,
      content: item.content,
      encoding: "base64", // Ensure it's base64 encoded
      contentType: item.mimeType,
    }
  })
  const mailOptions = {
    from: "iit.sahil2024@gmail.com",
    to: email,
    subject: subject,
    text: messageBody,
    attachments: attachmentsFormatted,
  }
  return mailOptions
}

// function getNewlyCreatedMail(email, subject, messageBody, attachments) {
//   const emailData = [
//     `To: ${email}`,
//     'Content-Type: multipart/mixed; boundary="foo_bar_baz"',
//     "MIME-Version: 1.0",
//     `Subject: ${subject}`,
//     "",
//     "--foo_bar_baz",
//     'Content-Type: text/plain; charset="UTF-8"',
//     "Content-Transfer-Encoding: 7bit",
//     "",
//     messageBody, // Email body text
//     "",
//     "--foo_bar_baz",
//   ]
//   for (const part of attachments) {
//     const tempData = [
//       `Content-Type: ${part.mimeType}; name="${part.filename}"`, // MimeType and filename
//       "Content-Transfer-Encoding: base64",
//       `Content-Disposition: attachment; filename="${part.filename}"`,
//       "",
//       part.content, // Base64 encoded attachment content
//       "--foo_bar_baz--", // Closing boundary}
//       "",
//     ]
//     emailData.push(...tempData)
//   }
//   // emailData.pop();
//   const joinedEmail = emailData.join("\n")
//   return joinedEmail
// }

module.exports = { getPersonalizedSubject, getPersonalizedBody, getAttachmentsForMail, createRawMessage }
