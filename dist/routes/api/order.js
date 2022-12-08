"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var userController_1 = require("../../controllers/userController");
var orderController_1 = require("../../controllers/orderController");
var orderRouter = express_1["default"].Router();
orderRouter.post('/create', userController_1.verifyAuthToken, orderController_1.create);
orderRouter.post('/:id/products', userController_1.verifyAuthToken, orderController_1.addProduct);
orderRouter.get('/current/:userId', userController_1.verifyAuthToken, orderController_1.getCurrentOrder);
orderRouter.get('/complete/:userId', userController_1.verifyAuthToken, orderController_1.getCompleteOrders);
exports["default"] = orderRouter;
