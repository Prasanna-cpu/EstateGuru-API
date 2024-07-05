import express  from "express";
import {deleteUser, getUserById, getUsers, updateUser} from "../controllers/user.js";
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



export default userRouter;