import express from "express";
import userRouter from "./api/user"
const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("main router");
});

routes.use("/users", userRouter);

export default routes;
