"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var imageController_1 = require("../../controllers/imageController");
var imageRouter = express_1["default"].Router();
imageRouter.get('/img1', imageController_1.img1);
imageRouter.get('/img2', imageController_1.img2);
exports["default"] = imageRouter;
