import express from "express";
import { index, show, create, destroy } from "../../controllers/userController";
const userRouter = express.Router();

userRouter.get("/", index);
userRouter.get("/:id", show);
userRouter.post("/", create);
userRouter.delete("/:id", destroy);

export default userRouter;
