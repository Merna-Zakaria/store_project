"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var userController_1 = require("../../controllers/userController");
var userRouter = express_1["default"].Router();
userRouter.get("/", userController_1.verifyAuthToken, userController_1.index);
userRouter.get("/:id", userController_1.verifyAuthToken, userController_1.show);
userRouter.post("/", userController_1.create); // as signup
userRouter.post("/authenticate", userController_1.authenticate); // as login
userRouter["delete"]("/:id", userController_1.verifyAuthToken, userController_1.destroy);
exports["default"] = userRouter;
