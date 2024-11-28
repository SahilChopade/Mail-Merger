require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const mailRouter = require("./routes/mailRoutes")
const sheetRouter = require("./routes/sheetRoutes")

//app creation
const app = express()
app.use(express.json({}))
app.use(cookieParser())
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
}
app.use(cors(corsOptions))

//mongodb connection
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connection Successfully.."))

//routes
app.use("/api", authRouter)
app.use("/user", userRouter)
app.use("/mail", mailRouter)
app.use("/sheet", sheetRouter)

//server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
