import createHttpError from "http-errors";
import axios from "axios";

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
const sendSms = async (sms: string, phone: string) => {
    let formatPhone = phone.replace('+', ''); 
    console.log(formatPhone)
    const url = process.env.SMS_URL as string;
    const apiKey = process.env.SMS_API_KEY as string;

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
    })
    if(!response.ok) {
        throw new createHttpError.BadGateway('Failed to send sms');
    }
    return true
}

export default sendSms;