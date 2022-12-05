"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var orderController_1 = require("../../controllers/orderController");
var orderRouter = express_1["default"].Router();
orderRouter.post('/', orderController_1.create);
orderRouter.post('/orders/:id/products', orderController_1.addProduct);
exports["default"] = orderRouter;
