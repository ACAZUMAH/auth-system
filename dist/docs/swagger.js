"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth System API',
            version: '1.0.0',
            description: 'Authentication system API',
            contact: {
                name: 'Auth System'
            },
            servers: ['https://auth-system-swart.vercel.app/']
        }
    },
    apis: ['dist/routers/*.js']
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setUpSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
};
exports.default = setUpSwagger;
