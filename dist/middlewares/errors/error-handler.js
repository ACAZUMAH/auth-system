"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * catches all errors thrown in the application and sends a response
 * @param err errors object
 * @param _req Request object
 * @param res Response object
 * @param _next Next function
 * @returns error response
 */
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    if (err instanceof http_errors_1.default.HttpError) {
        return res.status(err.statusCode).json({ error: [{ message: err.message }] });
    }
    return res.status(500).json({ error: [{ message: 'Internal server error' }] });
};
exports.default = errorHandler;
