import express  from "express";
import {login, logout, register} from "../controllers/auth.js";

const authRouter = express.Router();


authRouter.get("/",(req,res)=>{
    res.json("Auth Ready")
})

authRouter.post("/register",register)

authRouter.post("/login",login)

authRouter.post("/logout",logout)


export default authRouter;