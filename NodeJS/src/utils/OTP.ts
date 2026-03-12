// import { sendOTPMail } from "./mail.js";
// import { OTPReceiver } from '.';

export function generateOTP(length:number) {

    let digits = '0123456789';
    let OTP = '';
    let len = digits.length
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * len)];
    }
   
    return OTP;
}


// export const OTPService = async (email:string) : Promise<boolean> => {
//     // Generate OTP
//     const sendOTP = generateOTP(6)
//     // send OTP
//     await sendOTPMail(email, sendOTP)
//     // Receive OTP
//     /**@Query how to receive OTP */
//     const receiveOTP = await OTPReceiver();
//     // Verify OTP
//         if(sendOTP === receiveOTP) return true;
//     // Return Value

//     return false;
// };