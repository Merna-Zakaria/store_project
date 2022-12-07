"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var userController_1 = require("../../controllers/userController");
var productController_1 = require("../../controllers/productController");
var productRouter = express_1["default"].Router();
productRouter.get("/", productController_1.index);
productRouter.get("/:id", productController_1.show);
productRouter.post("/", userController_1.verifyAuthToken, productController_1.create);
exports["default"] = productRouter;
