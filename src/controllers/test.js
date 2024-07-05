import jwt from 'jsonwebtoken';

export const shouldBeLoggedIn=async(req,res)=>{
    // const token=req.cookies.token
    //
    // if(!token){
    //     return res.status(403).json({
    //         message:"Unauthenticated , no token present",
    //         status:403
    //     })
    // }
    //
    // jwt.verify(token,process.env.JWT_SIGN,async(err,payload)=>{
    //     if(err){
    //         return res.status(403).json({
    //             message:err.message,
    //             status:403
    //         })
    //     }

       // console.log(req.userId)


        res.status(200).json({
            message:"Authenticated",
            status:200
        })




}


export const shouldBeAdmin=async(req,res)=>{
    const token=req.cookies.token

    if(!token){
        return res.status(403).json({
            message:"Unauthenticated , no token present",
            status:403
        })
    }

    jwt.verify(token,process.env.JWT_SIGN,async(err,payload)=>{
        if(err){
            return res.status(403).json({
                message:err.message,
                status:403
            })
        }

        if(!payload.isAdmin){
            return res.status(403).json({
                message:"Unauthorized"
            })
        }

        res.status(200).json({
            message:"Authenticated",
            status:200
        })

    })
}