"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const error_handler_1 = __importDefault(require("../middlewares/errors/error-handler"));
const index_1 = __importDefault(require("../routers/index"));
require("../services/types");
const startExpressApp = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(index_1.default);
    app.all('*', (_req, res) => {
        res.status(404).send('Unable to find the requested resource!');
    });
    app.use(error_handler_1.default);
    return app;
};
exports.default = startExpressApp;
