"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
/**
 * generate one time password for user
 * @param len - length of the otp
 * @returns generated otp
 */
const generateOtp = async (len) => {
    const digits = '0123456789';
    const length = digits.length;
    let otp = '';
    for (let i = 0; i <= len; i++) {
        otp += digits.charAt(Math.floor(Math.random() * length));
    }
    ;
    return otp;
};
exports.generateOtp = generateOtp;
