/**
 * generate one time password for user
 * @param len - length of the otp
 * @returns generated otp
 */
export const generateOtp = async (len: number) => {
    const digits = '0123456789';
    const length = digits.length;
    let otp = '';
    for ( let i = 0; i <= len; i++){
        otp += digits.charAt(Math.floor(Math.random() * length));
    };
    return otp;
}