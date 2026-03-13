import express from 'express'
import { verifyTokenEmail } from '../controllers/emailCtr.js';

const router = express.Router()

// Auth routes
router.get('/verify', verifyTokenEmail)

export default router;
