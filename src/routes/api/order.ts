
import express from "express";
import { addProduct, create} from "../../controllers/orderController";
const orderRouter = express.Router();

orderRouter.post('/', create)
orderRouter.post('/orders/:id/products', addProduct)

export default orderRouter;