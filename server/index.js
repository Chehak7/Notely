import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/connectDb.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/generate.route.js"
import pdfRouter from "./routes/pdf.route.js"

dotenv.config()

const app = express()
app.use(cors(
  {
    origin: [
      "https://notelyclient.onrender.com"
    ].filter(Boolean),
    credentials : true,
    methods : ["GET","POST","PUT","DELETE","OPTIONS"],
  }
))
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.json({message: "Server is running"})
})

app.use("/api/auth", authRouter)
app.use("/api/user",userRouter)
app.use("/api/notes",notesRouter)
app.use("/api/pdf",pdfRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDb()
})

