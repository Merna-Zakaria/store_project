import express from "express";
import { verifyAuthToken } from "../../controllers/userController";
import { index, show, create } from "../../controllers/productController";
const productRouter = express.Router();

productRouter.get("/", index);
productRouter.get("/:id",  show);
productRouter.post("/", verifyAuthToken, create);          

export default productRouter;