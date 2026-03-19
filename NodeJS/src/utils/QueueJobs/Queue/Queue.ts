import { Queue } from "bullmq";
import { Redis } from "ioredis";

const connection = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

// define Queue for Verification Email and Welcome Email and Send SMS 
const RegisterEmailQueue = new Queue("RegisterEmailQueue", {
  connection: connection as any,
});
const RegisterSMSQueue = new Queue("RegisterSMSQueue", {
  connection: connection as any,
});
const VerificationEmailQueue = new Queue("VerificationEmailQueue", {
  connection: connection as any,
});

/**
 * Add Welcome mail on Queue.
 * @param email new register users email
 * @param userId new register users id
 * @param role new register users role
 */
export const RegisterEmailQ = async (
  email: string,
  userId: string,
  role: string,
) => {
  await RegisterEmailQueue.add(
    "sendRegisterEmail",
    { email, userId, role },
    {
      removeOnComplete: {
        age: 60,
        count: 1000,
      },
      removeOnFail: {
        age: 3 * 3600,
      },
    },
  );
};

/**
 * Add SMS in SMS Queue.
 * @param email verified user's email
 * @param username verified user's username
 */
export const RegisterSMSQ = async (email: string, username: string) => {
  await RegisterSMSQueue.add(
    "sendRegisterSMS",
    { email, username },
    {
      removeOnComplete: {
        age: 60,
        count: 1000,
      },
      removeOnFail: {
        age: 3 * 3600,
      },
    },
  );
};

/**
 * Add Welcome mail on Queue.
 * @param email new verified user's email  
 */
export const VerificationEmailQ = async (email: string) => {
  await VerificationEmailQueue.add(
    "sendVerificationEmail",
    { email },
    {
      removeOnComplete: {
        age: 60,
        count: 1000,
      },
      removeOnFail: {
        age: 3 * 3600,
      },
    },
  );
};
