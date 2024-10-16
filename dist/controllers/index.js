"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateProfile = exports.getUsers = exports.getProfile = exports.assignRole = exports.Login = exports.verifyOtp = exports.Register = void 0;
const helpers_1 = require("../helpers");
const create0tpAndSend_1 = require("../services/auth/create0tpAndSend");
const service = __importStar(require("../services/users"));
const helpers_2 = require("../helpers");
/**
 * controller to register a user
 * @param req Request object
 * @param res Response object
 * @returns response with success message and otp
 */
const Register = async (req, res) => {
    let { phone } = req.body;
    const create = await service.createUser({ ...req.body });
    const otp = await (0, create0tpAndSend_1.createAndSendCode)(create, phone);
    return res
        .status(200)
        .json({ success: true, message: "Account created your OTP is " + otp });
};
exports.Register = Register;
/**
 * controller to verify otp
 * @param req Request object
 * @param res Response object
 * @returns response with success message and token
 */
const verifyOtp = async (req, res) => {
    const { code } = req.body;
    const token = await (0, create0tpAndSend_1.verifyAndSendToken)(code, new Date());
    return res.status(200).json({ success: true, token: token });
};
exports.verifyOtp = verifyOtp;
/**
 * controller to login a user
 * @param req Request object
 * @param res Response object
 * @returns response with success message and token
 * @throws {Unauthorized} when credentials are invalid
 */
const Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await service.findUserByEmail(email);
    const ismatch = await (0, helpers_1.comparePassword)(password, user?.password);
    if (!ismatch) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
    }
    const token = await (0, helpers_2.genAccessToken)({ id: user._id });
    return res.status(200).json({ success: true, token: token });
};
exports.Login = Login;
/**
 * controller to assign role to a user
 * @param req Request object
 * @param res Response object
 * @returns response with success message
 * @throws {Unauthorized} when user is not an admin
 */
const assignRole = async (req, res) => {
    const { role } = req.body;
    const user = await service.findUserById(req.user.id);
    if (user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    await service.findByIdAndUpdate(req.params.id, {
        role: role,
    });
    return res
        .status(200)
        .json({ success: true, message: "Role assigned successfully" });
};
exports.assignRole = assignRole;
/**
 * controller to get user profile
 * @param req Request object
 * @param res Response object
 * @returns response with user profile
 * @throws {Unauthorized} when user is not an admin or user
 */
const getProfile = async (req, res) => {
    const user = await service.findUserById(req.user.id);
    if (user.role === "admin" || user.role === "user") {
        return res.status(200).json({ success: true, user: user });
    }
    return res.status(403).json({ success: false, message: "Unauthorized" });
};
exports.getProfile = getProfile;
/**
 * controller to get all users
 * @param req Request object
 * @param res Response object
 * @returns response with all users
 */
const getUsers = async (req, res) => {
    const users = await service.findUsers();
    return res.status(200).json({ success: true, users: users });
};
exports.getUsers = getUsers;
/**
 * controller to update user profile
 * @param req Request object
 * @param res Response object
 * @returns response with success message
 * @throws {Unauthorized} when user is not an admin or user
 */
const updateProfile = async (req, res) => {
    const user = await service.findUserById(req.user.id);
    if (user.role === "admin") {
        const update = await service.findByIdAndUpdate(req.query.id, { ...req.body });
        return res
            .status(200)
            .json({ success: true, message: update });
    }
    if (user.role === "user") {
        const update = await service.findByIdAndUpdate(req.user.id, { ...req.body });
        return res
            .status(200)
            .json({ success: true, message: update });
    }
};
exports.updateProfile = updateProfile;
/**
 * controller to delete a user
 * @param req Request object
 * @param res Response object
 * @returns response with success message
 * @throws {Unauthorized} when user is not an admin
 */
const deleteUser = async (req, res) => {
    const user = await service.findUserById(req.user.id);
    if (user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    await service.deleteUser(req.params.id);
    return res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
};
exports.deleteUser = deleteUser;
