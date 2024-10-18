"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const error_handler_1 = __importDefault(require("../middlewares/errors/error-handler"));
const index_1 = __importDefault(require("../routers/index"));
require("../services/types");
const passport_1 = __importDefault(require("passport"));
const startExpressApp = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.get('/', (req, res) => {
        res.send('<h1> Welcome to the auth-system API </h1>');
    });
    app.use(index_1.default);
    app.all('*', (_req, res) => {
        res.status(404).send('Unable to find the requested resource!');
    });
    app.use(error_handler_1.default);
    return app;
};
exports.default = startExpressApp;
