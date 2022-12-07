"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dashboardController_1 = require("../../controllers/dashboardController");
var dashboardRouter = express_1["default"].Router();
dashboardRouter.get('/products_in_orders', dashboardController_1.productsInOrders);
dashboardRouter.get('/users-with-orders', dashboardController_1.usersWithOrders);
dashboardRouter.get('/five-most-expensive', dashboardController_1.fiveMostExpensive);
exports["default"] = dashboardRouter;
