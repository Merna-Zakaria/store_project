"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var order_1 = __importDefault(require("./api/order"));
var user_1 = __importDefault(require("./api/user"));
var routes = express_1["default"].Router();
routes.get("/", function (req, res) {
    res.send("main router");
});
routes.use("/users", user_1["default"]);
routes.use("/orders", order_1["default"]);
exports["default"] = routes;
