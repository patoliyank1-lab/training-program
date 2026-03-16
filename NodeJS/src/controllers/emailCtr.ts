import type { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/error.js";
import { verifyToken, type Payload } from "../utils/JWT.js";
import User from "../models/User.js";
import { RegisterSMSQ, VerificationEmailQ } from "../utils/QueueJobs/Queue/Queue.js";


export const verifyTokenEmail = async (req: Request, res: Response) => {

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

        await RegisterSMSQ(user.email, user.username)
        await VerificationEmailQ(user.email)
        res.send('user verify successfully')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
        throw new NotFoundError('user not found.')
    }


}