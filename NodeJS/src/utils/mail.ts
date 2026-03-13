import nodemailer from 'nodemailer';
import { createToken } from './JWT.js';
import path from 'node:path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "patoliya.nk1@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD, // The 16-character App Password
  },
});


export const sendMail = async (to: string, Token: string) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, '/src/utils/EmailTemplates/EmailVerify.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    action_url: `http://localhost:${process.env.PORT}/api/email/verify?token=${Token}`
  };
  const htmlToSend = template(replacements);
  const info = await transporter.sendMail({
    from: '"Post-app" <post@test.com>',
    to: to,
    subject: "Verification mail.",
    text: "Hello world?", // Plain-text version of the message
    html: htmlToSend, // HTML version of the message
  });
}


export const sendTokenMail = async (email: string, userId: string, role: string) => {
  // generate Token {email,userid, role}
  const token = createToken(userId, email, role, 120);
  // send Token link
  await sendMail(email, token)

};


// welcome Mail 
export const sendWelcomeMail = async (to: string) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, '/src/utils/EmailTemplates/WelcomeEmail.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {};
  const htmlToSend = template(replacements);
  const info = await transporter.sendMail({
    from: '"Post-app" <post@test.com>',
    to: to,
    subject: "Welcome to our Post-app Platform!",
    text: "Hello world?", // Plain-text version of the message
    html: htmlToSend, // HTML version of the message
  });
}

