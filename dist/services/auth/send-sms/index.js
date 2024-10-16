"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * send otp to use via sms using a third party service
 * @param sms message to be sent
 * @param phone phone number to send the sms to
 * @returns true if sms is sent successfully
 * @throws BadGateway if sms fails to send
 * @example
 * const send = sendSms('Hello, your otp is 1234', '233xxxxxxxxx')
 * console.log(send)
 */
const sendSms = async (sms, phone) => {
    let formatPhone = phone.replace('+', '');
    console.log(formatPhone);
    const url = process.env.SMS_URL;
    const apiKey = process.env.SMS_API_KEY;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "key": apiKey,
            "msisdn": `${formatPhone}, 233xxxxxxxx`,
            "message": sms,
            "sender_id": "Waypik"
        })
    });
    if (!response.ok) {
        throw new http_errors_1.default.BadGateway('Failed to send sms');
    }
    return true;
};
exports.default = sendSms;
