import express  from "express";

const postRouter = express.Router();


postRouter.get("/",(req,res)=>{
    res.json("Post Ready")
})

export default postRouter;
