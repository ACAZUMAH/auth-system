import auth, { findByCodeAndDelete } from './index';
import createHttpError from 'http-errors';
import sendSms from './send-sms';
import { generateOtp } from './generate-Otp';
import { Types } from 'mongoose';
import { genAccessToken } from '../../helpers';
import { deleteUser, findByIdAndUpdate } from '../users';


/**
 * generate otp, update the database with otp and send sms to the user
 * @param id id of the user
 * @param phone phone number of the user
 * @returns true after sending the sms
 */
export const createAndSendCode = async (id: string | Types.ObjectId, phone: string) => {
    let otp = await generateOtp(5)
    while(await auth.findByCode(otp)){
        otp = await generateOtp(5)
    }
    const expiresIn = new Date(Date.now() + 1 * 60 * 1000)
    await auth.findUserAndUpdateCode(id, otp, expiresIn)
    const sms = `Your auth system OTP is ${otp}` 
    //await sendSms(sms, phone);
    return otp;
}

/**
 * verify the otp code and send the access token
 * @param code otp code
 * @param dateNow current date
 * @returns access token
 * @throws {BadRequest} when otp is expired
 */
export const verifyAndSendToken = async (code: string, dateNow: Date) => {
    const otp: any = await findByCodeAndDelete(code);
    if(dateNow > otp.expiresIn){
        await deleteUser(otp.user)
        throw new createHttpError.BadRequest('OTP expired')
    } 
    const update:any = await findByIdAndUpdate(otp.user)
    return await genAccessToken({ id: update._id });
}