import express from 'express'
import { verifyTokenEmail, verifyOTP } from '../controllers/emailCtr.js';

const router = express.Router()

// Auth routes
router.get('/otp-verify', verifyOTP)
router.get('/verify', verifyTokenEmail)

export default router;
