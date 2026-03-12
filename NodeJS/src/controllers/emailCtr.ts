import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/error.js";
import { verifyToken, type Payload } from "../utils/JWT.js";
import User from "../models/User.js";
import { sendWelcomeMail } from "../utils/mail.js";
import { sendSMS } from "../utils/SMS.js";

export const verifyOTP = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        //get OPT from params
        const OTP = req.query.otp;
        if (!OTP) throw new UnauthorizedError('OTP not Enter.')


    })


export const verifyTokenEmail = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.query.token

    if (!token) throw new UnauthorizedError('Token not found.');

    const isVerify = verifyToken(token as string)
    
    if (!isVerify) throw new UnauthorizedError('invalid Token.');
    
    const reqUser = isVerify as Payload;
    if (!reqUser) throw new BadRequestError('User not found or invalid token.');
    try {
        const user = await User.findOneAndUpdate(
            { _id: reqUser.userId, email: reqUser.email, role: reqUser.role },
            { $set: { isVerify: true } }
        ).lean();
        if (!user) throw new BadRequestError('User not found or invalid token.');

        sendWelcomeMail(user.email)
        res.send('user verify successfully')
        await sendSMS(user.email, user.username)

    }catch(error){
        throw new NotFoundError('user not found.')
    }


}