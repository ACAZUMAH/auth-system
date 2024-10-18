"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.findGoogleUsers = exports.findUsers = exports.findByIdAndUpdate = exports.findUserByEmail = exports.findGoogleUser = exports.findUserById = exports.createUser = exports.createGoogleUser = void 0;
const schemas_1 = require("../../models/schemas");
const http_errors_1 = __importDefault(require("http-errors"));
const index_1 = require("../auth/index");
const helpers_1 = require("../../helpers");
const validate_signup_1 = __importDefault(require("./validators/validate-signup"));
const validate_update_1 = __importDefault(require("./validators/validate-update"));
const mongoose_1 = require("mongoose");
/**
 * create a user with google data
 * @param data google user data
 * @returns created user
 */
const createGoogleUser = async (data) => {
    const user = await schemas_1.oauth.create({ ...data });
    await (0, index_1.createAuth)(user._id);
    return user;
};
exports.createGoogleUser = createGoogleUser;
/**
 * save user data in the database and create an auth record
 * @param data user information
 * @returns object id of the user
 * @throws {Conflict} when user already exists
 */
const createUser = async (data) => {
    await (0, validate_signup_1.default)(data);
    if (await schemas_1.user.exists({ $or: [{ email: data.email }, { phone: data.phone }] })) {
        throw new http_errors_1.default.Conflict("User already exists");
    }
    const hash = await (0, helpers_1.hashPassword)(data.password);
    const saveUser = await schemas_1.user.create({
        ...data,
        password: hash,
    });
    await (0, index_1.createAuth)(saveUser._id);
    return saveUser._id;
};
exports.createUser = createUser;
/**
 * find user in the database by id and return the user data
 * @param id id of the user
 * @returns found user
 * @throws {BadRequest} when id is invalid
 */
const findUserById = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new http_errors_1.default
            .BadRequest('Invalid user id');
    }
    return await schemas_1.user.findById(id, { password: 0, is_authenticated: 0 })
        || await schemas_1.oauth.findById(id, { password: 0, is_authenticated: 0 });
};
exports.findUserById = findUserById;
/**
 * find google user by id in the database
 * @param id google user id
 * @returns user
 */
const findGoogleUser = async (id) => {
    const user = await schemas_1.oauth.findOne({ googleId: id });
    return user;
};
exports.findGoogleUser = findGoogleUser;
/**
 * retrieve user data from the database
 * @param email user email
 * @returns found user
 * @throws {NotFound} when useer is not found
 */
const findUserByEmail = async (email) => {
    const foundUser = schemas_1.user.findOne({ email: email })
        || schemas_1.oauth.findOne({ email: email });
    if (!foundUser) {
        throw new http_errors_1.default
            .NotFound('No user with this email found');
    }
    return foundUser;
};
exports.findUserByEmail = findUserByEmail;
/**
 * find user by id and update the user data
 * @param id id of the user information to be updated
 * @param data new data to be updated
 * @returns updated user data
 * @throws {BadRequest} when id is invalid
 */
const findByIdAndUpdate = async (id, data) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new http_errors_1.default.BadRequest('Invalid user id');
    }
    if (data) {
        await (0, validate_update_1.default)(data);
        const updateFields = {};
        if (data?.name)
            updateFields.name = data.name;
        if (data?.email)
            updateFields.email = data.email;
        if (data?.phone)
            updateFields.phone = data.phone;
        if (data?.role)
            updateFields.role = data.role;
        if (Object.keys(updateFields).length > 0) {
            return await schemas_1.user
                .findByIdAndUpdate(id, { $set: updateFields }, { new: true }) ||
                await schemas_1.oauth.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
        }
    }
    return await schemas_1.user.findByIdAndUpdate(id, { $set: { is_authenticated: true } })
        || await schemas_1.oauth.findByIdAndUpdate(id, { $set: { is_authenticated: true } });
};
exports.findByIdAndUpdate = findByIdAndUpdate;
/**
 * find all users in the database
 * @returns all users
 */
const findUsers = async (query) => {
    const { page, limit } = query;
    let users = schemas_1.user.find({}, { password: 0, role: 0, is_authenticated: 0 });
    let pages = Number(page) || 1;
    let limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;
    users = users.skip(skip).limit(limits);
    const result = await users;
    return result;
};
exports.findUsers = findUsers;
/**
 * find all users in the database
 * @param query query parameters
 * @returns found users
 */
const findGoogleUsers = async (query) => {
    const { page, limit } = query;
    let users = schemas_1.oauth.find({}, { is_authenticated: 0 });
    let pages = Number(page) || 1;
    let limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;
    users = users.skip(skip).limit(limits);
    const result = await users;
    return result;
};
exports.findGoogleUsers = findGoogleUsers;
/**
 * delete user from the database
 * @param id id of the user to be deleted
 * @returns deleted user
 * @throws {BadRequest} when id is invalid
 */
const deleteUser = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new http_errors_1.default.BadRequest('Invalid user id');
    }
    return await schemas_1.user.findByIdAndDelete(id) ||
        await schemas_1.oauth.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
