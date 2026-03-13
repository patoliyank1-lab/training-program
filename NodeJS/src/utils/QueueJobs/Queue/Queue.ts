import { Queue } from "bullmq";
import { Redis } from "ioredis";

const connection = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

// Reuse the ioredis instance in 2 different producers
const RegisterEmailQueue = new Queue("RegisterEmailQueue", {
  connection: connection as any,
});
const RegisterSMSQueue = new Queue("RegisterSMSQueue", {
  connection: connection as any,
});
const VerificationEmailQueue = new Queue("VerificationEmailQueue", {
  connection: connection as any,
});


export const RegisterEmailQ = async (email:string, userId:string, role:string) => {
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


export const RegisterSMSQ = async (email:string, username:string) => {
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


export const VerificationEmailQ = async (email:string) => {
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

