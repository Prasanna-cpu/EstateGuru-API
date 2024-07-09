import express  from "express";
import {deleteUser, getUserById, getUsers, profilePost, savePost, updateUser} from "../controllers/user.js";
import {login} from "../controllers/auth.js";
import {verifyToken} from "../middleware/verifyToken.js";

const userRouter = express.Router();


// userRouter.get("/",(req,res)=>{
//     res.json("User Ready")
// })



userRouter.get("/users",getUsers)

userRouter.get("/:id",verifyToken,getUserById)


userRouter.put("/:id",verifyToken,updateUser)


userRouter.delete("/:id",verifyToken,deleteUser)

userRouter.post("/save",verifyToken,savePost)


userRouter.get("/profile",verifyToken,profilePost)






export default userRouter;