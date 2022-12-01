import express from "express";
import { index, show, create, authenticate, destroy, verifyAuthToken } from "../../controllers/userController";
const userRouter = express.Router();

userRouter.get("/", index);
userRouter.get("/:id", show);
userRouter.post("/", create);
userRouter.post("/authenticate", authenticate);
userRouter.delete("/:id", destroy);

export default userRouter;
