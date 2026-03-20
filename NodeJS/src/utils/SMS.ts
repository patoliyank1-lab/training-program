import twilio from "twilio";
import { Logger } from "../middlewares/logger.js";
const accountSid = process.env.PHONE_SID;
const authToken = process.env.PHONE_TOKEN;

const client = twilio(accountSid, authToken);

/**
 * this function is use to send sms to Admin phone on user register and Verification
 * @param email register user's email
 * @param username register user's username.
 */
export const sendSMS = async (email: string, username: string) => {
  try {
    client.messages
      .create({
        body: `New User Register with ${email} email and username ${username}`,
        from: "+15748215721",
        to: "+916355639005",
      })
      .then((message: any) => Logger.info(message.sid));
  } catch (error: any) {
    throw new Error(error.massage, { cause: error });
  }
};
