const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "iit.sahil2024@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: "1//0g1ATu4kU7j5gCgYIARAAGBASNwF-L9IrOYewf9QYcEYMSvcA0SAAIYShR9kuSfwjKjmSivS1qnbBlgampyraP1CzNqkTVJ1LTto",
  },
})

module.exports = { transporter }
