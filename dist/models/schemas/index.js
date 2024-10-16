"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.user = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    is_authenticated: { type: Boolean, default: false },
}, { timestamps: true });
const authSchema = new mongoose_1.Schema({
    code: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    expiresIn: { type: Date, default: Date.now() + 1 * 60 * 60000 },
});
exports.user = (0, mongoose_1.model)('User', userSchema);
exports.auth = (0, mongoose_1.model)('Auth', authSchema);
exports.default = {
    user: exports.user,
    auth: exports.auth
};
