require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const session = require("express-session")
const authRouter = require("./routes/authRoutes")
const mailRouter = require("./routes/mailRoutes")
const sheetRouter = require("./routes/sheetRoutes")
const passport = require("passport")
require("./config/passport");


//app creation
const app = express()
app.use(express.json({}))
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))

//mongodb connection
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connection Successfully.."))

//passport session
app.use(
  session({
    secret: "JWIkLLGkPCqc8b05qhtVmOs9vOtgnXrO",
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

//routes
app.use("/api", authRouter)
app.use("/mail", mailRouter)
app.use("/sheet", sheetRouter)

//server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
