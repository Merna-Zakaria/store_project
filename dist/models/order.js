"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderSrore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderSrore = /** @class */ (function () {
    function OrderSrore() {
    }
    OrderSrore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("can not get orders list. ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderSrore.prototype.create = function (o) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var sqlOrderInfo, conn, result, order_1, sql, finalQuery, result_1, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        sqlOrderInfo = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(sqlOrderInfo, [o.user_id, o.status])];
                    case 2:
                        result = _b.sent();
                        order_1 = result.rows[0];
                        if (!order_1.id) return [3 /*break*/, 4];
                        sql = (_a = o.products) === null || _a === void 0 ? void 0 : _a.map(function (item) { return "(".concat(item.quantity, ", ").concat(order_1.id, ", ").concat(item.id, ")"); });
                        finalQuery = "INSERT INTO order_products (quantity, order_id, product_id) VALUES " +
                            sql;
                        return [4 /*yield*/, conn.query(finalQuery)];
                    case 3:
                        result_1 = _b.sent();
                        conn.release();
                        return [2 /*return*/, order_1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        throw new Error("Could not add new order. ".concat(err_2));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderSrore.prototype.addProduct = function (quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, conn, result, order, err_3, sql, conn, result, order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        ordersql = "SELECT * FROM orders WHERE id=($1)";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(ordersql, [orderId])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        if (order.status !== "active") {
                            throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, " because order status is ").concat(order.status));
                        }
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("".concat(err_3));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 5:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [quantity, orderId, productId])];
                    case 6:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 7:
                        err_4 = _a.sent();
                        throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, " Error_model: ").concat(err_4));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderSrore.prototype.getCurrentOrder = function (userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var products, orderId, conn, orderSql, userIdList, currentOrderIndex, sql, result, currentOrder, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _b.sent();
                        orderSql = "SELECT id FROM orders WHERE user_id = ($1)";
                        return [4 /*yield*/, conn.query(orderSql, [userId])];
                    case 2:
                        userIdList = _b.sent();
                        if (!(userIdList.rows.length > 0)) return [3 /*break*/, 4];
                        currentOrderIndex = userIdList.rows.length - 1;
                        orderId = (_a = userIdList.rows[currentOrderIndex]) === null || _a === void 0 ? void 0 : _a.id;
                        sql = "SELECT * FROM order_products WHERE order_id = ($1)";
                        return [4 /*yield*/, conn.query(sql, [orderId])];
                    case 3:
                        result = _b.sent();
                        products = result.rows;
                        conn.release();
                        currentOrder = { id: orderId, user_id: userId, products: products === null || products === void 0 ? void 0 : products.map(function (pdt) { return ({ id: pdt.product_id, quantity: pdt.quantity }); }) };
                        return [2 /*return*/, currentOrder];
                    case 4: throw new Error("This user do not have any order");
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_5 = _b.sent();
                        throw new Error("Could not get current order. ".concat(err_5));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OrderSrore.prototype.getCompleteOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, completeOrder, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [userId, 'complete'])];
                    case 2:
                        result = _a.sent();
                        completeOrder = result.rows;
                        return [2 /*return*/, completeOrder];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not get compelete orders. Error_model: ".concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderSrore;
}());
exports.OrderSrore = OrderSrore;
