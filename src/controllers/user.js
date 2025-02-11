import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers=async(req,res)=>{

    try{

        const users=await prisma.user.findMany({})

        res.status(200).json({
            users
        })

    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            error:`Something went wrong ${e.message}`
        })
    }

}

export const getUserById=async(req,res)=>{
    const id=parseInt(req.params.id,10)
    try{
        const user=await prisma.user.findUnique({
            where:{
                id:id
            }
        })

        if(!user){
            res.status(404).json({
                message:`User with id ${id} not found`,
                status:404
            })
        }

        res.status(200).json({
            user
        })



    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            error:`Something went wrong ${e.message}`
        })
    }

}

export const updateUser=async(req,res)=>{
    try{
        const id=parseInt(req.params.id,10)
        const tokenUserId=req.userId
        const body=req.body
        console.log(tokenUserId)

        const {password,...inputs}=req.body


        if(id!==tokenUserId){
            return res.status(403).json({
                message:"Unauthorized",
                status:403
            })
        }

        let updatedPassword=null

        try{

            if(password){
                updatedPassword=await bcrypt.hash(password,12)
            }


            let avatar;
            const updatedUser=await prisma.user.update({
                where:{id},
                data:{
                    ...inputs,
                    ...(updatedPassword && {password:updatedPassword}),
                    ...(avatar && {avatar})
                }
            })

            const { password: userPassword, ...rest } = updatedUser;


            res.status(200).json(rest);

        }

        catch(e){
            res.status(404).json({
                message:`User with id ${id} not found`,
            })
        }


    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            error:`Something went wrong ${e.message}`
        })
    }

}

export const deleteUser=async(req,res)=>{
    try{

        const id=parseInt(req.params.id,10)
        const tokenUserId=req.userId

        if(id!==tokenUserId){
            return res.status(403).json({
                message:"Unauthorized",
                status:403
            })
        }

        await prisma.user.delete({
            where:{id:id},
        })

        return res.status(200).json({
            message:"User deleted"
        })


    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            error:`Something went wrong ${e.message}`
        })
    }

}

export const savePost=async(req,res)=>{
    const postId=req.body.postId
    const tokenId=req.userId

    try{
        const savedPost=await prisma.savedPost.findUnique({
            where:{
                userId_postId:{
                    userId:tokenId,
                    postId
                }
            }
        })

        if(savedPost){
            await prisma.savedPost.delete({
                where:{
                    id:savedPost.id
                }
            })
            res.status(200).json({
                message:"Post removed from saved list"
            })
        }
        else{
            await prisma.savedPost.create({
                data:{
                    userId:tokenId,
                    postId
                }
            })

            res.status(200).json({
                message:"Post saved successfully",
            })
        }


    }
    catch(err){
        res.status(500).json({
            message:"Something went wrong",
        })
    }



}

export const profilePost=async(req,res)=>{
     const tokenId=req.params.id
     try{
         const userPosts=await prisma.post.findMany({
             where:{
                 userId:tokenId
             }
         })

         const saved=await prisma.savedPost.findMany({
             where:{
                 userId:tokenId,
             },
             include:{
                 post:true
             }
         })

         const savedPosts=saved.map(item=>item.post)

         res.status(200).json({
             userPosts,savedPosts
         })

     }
     catch (e) {
         res.status(500).json({
             message:"Something went wrong",
         })
     }
}