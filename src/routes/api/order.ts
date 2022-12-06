
import express from "express";
import { addProduct, create} from "../../controllers/orderController";
const orderRouter = express.Router();

orderRouter.post('/create', create)
orderRouter.post('/:id/products', addProduct)

export default orderRouter;