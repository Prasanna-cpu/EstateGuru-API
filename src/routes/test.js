import express from 'express'
import {shouldBeAdmin, shouldBeLoggedIn} from "../controllers/test.js";
import {verifyToken} from "../middleware/verifyToken.js";

const testRouter = express.Router()


testRouter.get("/isloggedin",verifyToken,shouldBeLoggedIn)

testRouter.get("/isadmin",shouldBeAdmin)


export default testRouter