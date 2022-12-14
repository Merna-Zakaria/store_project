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
exports.destroy = exports.verifyAuthToken = exports.authenticate = exports.create = exports.show = exports.index = void 0;
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var store = new user_1.UserSrore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json("".concat(err_1));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.show(req.params.id)];
            case 1:
                user = _a.sent();
                res.status(200).json(user);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json("".concat(err_2));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first_name, last_name, password, user, newUser, token, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, password = _a.password;
                if (!(first_name && last_name && password)) return [3 /*break*/, 2];
                user = {
                    first_name: first_name,
                    last_name: last_name,
                    password: password
                };
                return [4 /*yield*/, store.create(user)];
            case 1:
                newUser = _b.sent();
                token = jsonwebtoken_1["default"].sign({ user: newUser }, process.env.TOKEN_SECRET);
                res.json({
                    id: newUser === null || newUser === void 0 ? void 0 : newUser.id,
                    first_name: newUser === null || newUser === void 0 ? void 0 : newUser.first_name,
                    last_name: newUser === null || newUser === void 0 ? void 0 : newUser.last_name,
                    token: token
                });
                return [3 /*break*/, 3];
            case 2: throw new Error("Could not add new user.");
            case 3: return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                res.status(400).json("".concat(err_3));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first_name, last_name, password, user, userLoggedIn, token, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, password = _a.password;
                if (!(first_name && last_name && password)) return [3 /*break*/, 2];
                user = {
                    first_name: first_name,
                    last_name: last_name,
                    password: password
                };
                return [4 /*yield*/, store.authenticate(user)];
            case 1:
                userLoggedIn = _b.sent();
                if (userLoggedIn) {
                    token = jsonwebtoken_1["default"].sign({ user: userLoggedIn }, process.env.TOKEN_SECRET);
                    res.json({
                        id: userLoggedIn.id,
                        first_name: userLoggedIn.first_name,
                        last_name: userLoggedIn.last_name,
                        token: token
                    });
                }
                return [3 /*break*/, 3];
            case 2: throw new Error("Invalid data entered.");
            case 3: return [3 /*break*/, 5];
            case 4:
                err_4 = _b.sent();
                res.status(400).json("".concat(err_4));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.authenticate = authenticate;
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401).json("Access denied, invalid token");
    }
};
exports.verifyAuthToken = verifyAuthToken;
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, store["delete"](id)];
            case 1:
                deleted = _a.sent();
                res.json(deleted);
                return [2 /*return*/];
        }
    });
}); };
exports.destroy = destroy;
// const update = async (req: Request, res: Response) => {
//   const user: User = {
//       id: parseInt(req.params.id),
//       username: req.body.username,
//       password: req.body.password,
//   }
//   try {
//       const authorizationHeader = req.headers.authorization
//       const token = authorizationHeader.split(' ')[1]
//       const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
//       if(decoded.id !== user.id) {
//           throw new Error('User id does not match!')
//       }
//   } catch(err) {
//       res.status(401)
//       res.json(err)
//       return
//   }
//   try {
//       const updated = await store.create(user)
//       res.json(updated)
//   } catch(err) {
//       res.status(400)
//       res.json(err + user)
//   }
// }
