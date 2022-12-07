import express from "express";
import { index, show, create, authenticate, destroy, verifyAuthToken } from "../../controllers/userController";
const userRouter = express.Router();

userRouter.get("/", verifyAuthToken, index);
userRouter.get("/:id",verifyAuthToken,  show);
userRouter.post("/", create);                       // as signup
userRouter.post("/authenticate", authenticate);     // as login
userRouter.delete("/:id", verifyAuthToken, destroy);

export default userRouter;
