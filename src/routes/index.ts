import express from "express";
import orderRouter from "./api/order";
import userRouter from "./api/user";
import dashboardRouter from "./api/dashboard";
const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("main router");
});

routes.use("/users", userRouter);
routes.use("/orders", orderRouter);
routes.use("/dashboard", dashboardRouter);

export default routes;
