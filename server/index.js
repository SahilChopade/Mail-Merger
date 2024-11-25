require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json({}))

const authRouter = require("./routes/authRoutes")
const mailRouter = require("./routes/mailRoutes")

app.use("/api", authRouter)
app.use("/", mailRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
