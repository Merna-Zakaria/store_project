import express from "express";
import { verifyAuthToken } from "../../controllers/userController";
import { addProduct, create, getCurrentOrder, getCompleteOrders} from "../../controllers/orderController";
const orderRouter = express.Router();

orderRouter.post('/create', verifyAuthToken, create)
orderRouter.post('/:id/products', verifyAuthToken,  addProduct)
orderRouter.get('/current/:userId', verifyAuthToken,  getCurrentOrder)
orderRouter.get('/complete/:userId', verifyAuthToken,  getCompleteOrders)

export default orderRouter;