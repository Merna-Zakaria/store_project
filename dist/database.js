"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRESS_PASSWORD = _a.POSTGRESS_PASSWORD, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, ENV = _a.ENV;
var Client = new pg_1.Pool;
if (ENV === 'test') {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRESS_PASSWORD
    });
}
if (ENV === 'dev') {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        //  database: POSTGRES_TEST_DB, //use in testiong
        user: POSTGRES_USER,
        password: POSTGRESS_PASSWORD
    });
}
exports["default"] = Client;
