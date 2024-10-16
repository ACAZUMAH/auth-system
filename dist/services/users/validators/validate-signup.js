"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const http_errors_1 = __importDefault(require("http-errors"));
const validateData = async (data) => {
    const ajv = new ajv_1.default();
    (0, ajv_formats_1.default)(ajv);
    ajv.addFormat("phone", {
        type: "string",
        validate: (value) => {
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            return phoneRegex.test(value);
        },
    });
    const Schema = {
        type: "object",
        properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string", format: "phone" },
            password: { type: "string", minLength: 6 },
            role: { type: "string", enum: ["user", "admin"] },
        },
        required: ["name", "email", "phone", "password"],
        additionalProperties: false,
    };
    const validate = ajv.compile(Schema);
    const isValid = validate(data);
    if (!isValid) {
        throw new http_errors_1.default.BadRequest(validate.errors?.map((error) => error.message).join(", "));
    }
    ;
};
exports.default = validateData;
