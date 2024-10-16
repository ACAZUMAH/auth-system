"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByCodeAndDelete = exports.findUserAndUpdateCode = exports.findByCode = exports.createAuth = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const schemas_1 = require("../../models/schemas");
/**
 * save user id in the database to be updated with the otp code
 * @param id id of the user
 * @returns true when user id is saved successfully
 */
const createAuth = async (id) => {
    await schemas_1.auth.create({ user: id });
    return true;
};
exports.createAuth = createAuth;
/**
 * check in the database if the exist a user with the given otp code
 * @param code code to check
 * @returns found user
 */
const findByCode = async (code) => {
    return await schemas_1.auth.findOne({ code });
};
exports.findByCode = findByCode;
/**
 * find user in the database with the given id
 * and update it with otp code and expiring date
 * @param id user id
 * @param otp otp code
 * @param expiresIn expiring date
 * @returns true when update successfully
 */
const findUserAndUpdateCode = async (id, otp, expiresIn) => {
    if (!await schemas_1.auth.findOne({ user: id })) {
        throw new Error('Not found');
    }
    await schemas_1.auth.findOneAndUpdate({ user: id }, { code: otp, expiresIn });
    return true;
};
exports.findUserAndUpdateCode = findUserAndUpdateCode;
/**
 * find user in the database with the given otp code
 * and delete it
 * @param code otp code
 * @returns deleted user
 */
const findByCodeAndDelete = async (code) => {
    if (!await schemas_1.auth.findOne({ code })) {
        throw new http_errors_1.default.NotFound('Invalid otp');
    }
    return schemas_1.auth.findOneAndDelete({ code });
};
exports.findByCodeAndDelete = findByCodeAndDelete;
exports.default = {
    createAuth: exports.createAuth,
    findByCode: exports.findByCode,
    findUserAndUpdateCode: exports.findUserAndUpdateCode,
    findByCodeAndDelete: exports.findByCodeAndDelete
};
