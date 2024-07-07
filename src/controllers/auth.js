import {loginSchema, registerSchema} from "../Schema/auth.js";
import bcrypt from "bcrypt"
import prisma from "../../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const register=async (req,res)=>{
    try{
        const {error}=registerSchema.validate(req.body)

        if(error){
            return res.status(400).json({
                message:error.details[0].message,
                status:400
            })
        }

        const {username,email,password}=req.body



        const hashedPassword=await bcrypt.hash(password,12)

        const newUser=await prisma.user.create({
            data:{
                username,
                email,
                password:hashedPassword
            }
        })

        res.status(201).json({
            user:newUser,
            message:"Created",
            status:201
        })
    }

    catch(err){
        return res.status(500).json({
            message:err.message,
            status:500
        })

    }

}

export const login=async(req,res)=>{

    try{
        const {error}=loginSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message:error.details[0].message,
                status:400
            })
        }

        const {username,password}=req.body



        const user=await prisma.user.findUnique({
            where:{
                username
            }
        })

        const isPasswordValid=await bcrypt.compare(password,user.password)


        if(!user || !isPasswordValid){
            return res.status(401).send({
                message:"Invalid Credentials",
                status:401
            })
        }

        // res.setHeader("Set-Cookie","test="+"myValue").json({
        //     message:"Logged in",
        // })

        const age=1000*60*60*24*7

        const token=jwt.sign({
            id:user.id,
            isAdmin:true
        },process.env.JWT_SIGN,{expiresIn:age})

        const {password:userPassword,...userInfo} = user


        res.cookie("user",token,{
            httpOnly:true,
            //secure:true
            maxAge:age,
            isAdmin:true
        })
            .status(200).json({
            id:user.id,
            username:user.username,
            message:"Successful Log In",
            status:200
        })

    }
    catch(err){
        return res.status(500).json({
            message:err.message,
            status:500
        })
    }

}

export const logout=(req,res)=>{
    res.clearCookie("user").status(200).json({
        message:"Logout successful"
    })
}