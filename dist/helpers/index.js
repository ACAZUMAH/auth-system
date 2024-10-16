"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.genAccessToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const hashPassword = async (password) => {
    const salt = await (0, bcrypt_1.genSalt)(10);
    return await (0, bcrypt_1.hash)(password, salt);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return await (0, bcrypt_1.compare)(password, hash);
};
exports.comparePassword = comparePassword;
const genAccessToken = async (data) => {
    const payload = { id: data.id };
    return (0, jsonwebtoken_1.sign)(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
exports.genAccessToken = genAccessToken;
const verifyAccessToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    ;
    (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        req.user = user;
        next();
    });
};
exports.verifyAccessToken = verifyAccessToken;
