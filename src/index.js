import express from "express";

import dotenv from "dotenv"
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import testRouter from "./routes/test.js";


dotenv.config()

const port = process.env.PORT
console.log(port)

const app = express();



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))


app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)
app.use("/api/user",userRouter)
app.use("/api/test",testRouter)



app.get("/",(req,res)=>{
    res.json("Hello World!")
})



app.listen(port,()=>{
    console.info(`Listening on port ${port}`)
})
