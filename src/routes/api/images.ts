import express from "express";
import {img1, img2} from "../../controllers/imageController";
const imageRouter = express.Router();

imageRouter.get('/img1', img1);
imageRouter.get('/img2', img2);

export default imageRouter;
