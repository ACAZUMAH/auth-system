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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAndSendToken = exports.createAndSendCode = void 0;
const auth = __importStar(require("./index"));
const http_errors_1 = __importDefault(require("http-errors"));
const generate_Otp_1 = require("./generate-Otp");
const helpers_1 = require("../../helpers");
const users_1 = require("../users");
/**
 * generate otp, update the database with otp and send sms to the user
 * @param id id of the user
 * @param phone phone number of the user
 * @returns true after sending the sms
 */
const createAndSendCode = async (id, phone) => {
    let otp = await (0, generate_Otp_1.generateOtp)(5);
    while (await auth.findByCode(otp)) {
        otp = await (0, generate_Otp_1.generateOtp)(5);
    }
    const expiresIn = new Date(Date.now() + 1 * 60 * 1000);
    await auth.findUserAndUpdateCode(id, otp, expiresIn);
    const sms = `Your auth system OTP is ${otp}`;
    //await sendSms(sms, phone);
    return otp;
};
exports.createAndSendCode = createAndSendCode;
/**
 * verify the otp code and send the access token
 * @param code otp code
 * @param dateNow current date
 * @returns access token
 * @throws {BadRequest} when otp is expired
 */
const verifyAndSendToken = async (code, dateNow) => {
    const otp = await auth.findByCodeAndDelete(code);
    console.log(otp);
    if (dateNow > otp.expiresIn) {
        await (0, users_1.deleteUser)(otp.user);
        throw new http_errors_1.default.BadRequest('OTP expired');
    }
    const updateUser = await (0, users_1.findByIdAndUpdate)(otp.user);
    return await (0, helpers_1.genAccessToken)({ id: updateUser._id });
};
exports.verifyAndSendToken = verifyAndSendToken;
