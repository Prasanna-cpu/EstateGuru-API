import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token


    if(!token){
        return res.status(401).json({
            status:401,
            message:"Unauthenicated Token"
        })
    }

    jwt.verify(token,process.env.JWT_SIGN,async(err,payload)=>{
        if(err){
            return res.status(403).json({
                message:"Invalid Token",
            })
        }
        req.userId=payload.id
        next();
    })
}