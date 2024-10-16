"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const startExpressApp_1 = __importDefault(require("./startExpressApp"));
const index_1 = __importDefault(require("../models/index"));
const startServer = async () => {
    await (0, index_1.default)(process.env.MONGO_URI);
    const app = await (0, startExpressApp_1.default)();
    const server = http_1.default.createServer(app);
    const port = process.env.PORT || 3500;
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};
exports.default = startServer;
