import express from "express";
import { productsInOrders, usersWithOrders, fiveMostExpensive } from "../../controllers/dashboardController";
const dashboardRouter = express.Router();

dashboardRouter.get('/products_in_orders', productsInOrders)
dashboardRouter.get('/users-with-orders', usersWithOrders)
dashboardRouter.get('/five-most-expensive', fiveMostExpensive)

export default dashboardRouter;