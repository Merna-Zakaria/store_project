import express from "express";
import imageRouter from "./api/images"
const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("main router");
});

routes.use("/images", imageRouter);

export default routes;
