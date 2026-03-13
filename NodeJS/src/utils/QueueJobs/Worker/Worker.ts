import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { sendTokenMail, sendWelcomeMail } from '../../mail.js';
import { sendSMS } from '../../SMS.js';
import { Logger } from '../../../middlewares/logger.js';

const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
});

// Reuse the ioredis instance in 2 different consumers
const RegisterEmailWorker = new Worker('RegisterEmailQueue', async job => {
    await sendTokenMail(job.data.email, job.data.userId, job.data.role);
}, {
  connection:connection as any,
});
const RegisterSMSWorker = new Worker('RegisterSMSQueue', async job => {
        await sendSMS(job.data.email, job.data.username)
}, {
  connection:connection as any,
});

const VerificationEmailWorker = new Worker('VerificationEmailQueue', async job => {
        await sendWelcomeMail(job.data.email)
}, {
  connection:connection as any,
});

RegisterEmailWorker.on('completed', (job) => {Logger.info(`Register Email successfully send on ${job.data.email}`)} )
VerificationEmailWorker.on('completed', (job) => {Logger.info(`Welcome Email successfully send on ${job.data.email}`)})
VerificationEmailWorker.on('completed', (job) => {Logger.info(`Register information successfully send on SMS. {${job.data.email}`) })

RegisterEmailWorker.on('failed', (job: any, error) => {
  Logger.warn(`Register Email failed to send on ${job.data.email}`);
  Logger.error(`JobId: ${job.id}, Error: ${error}`);
} )
VerificationEmailWorker.on('failed', (job: any, error) => {
  Logger.warn(`Welcome Email failed to send on ${job.data.email}`)
  Logger.error(`JobId: ${job.id}, Error: ${error}`);
})
VerificationEmailWorker.on('failed', (job: any, error) => {
  Logger.warn(`Register information failed to send on SMS. {${job.data.email}}`) 
  Logger.error(`JobId: ${job.id}, Error: ${error}`);
})