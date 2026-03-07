import express from 'express'
import { loginUser, registerUser,getProfile } from '../controllers/userCtr.js'

const router = express.Router()

// Auth routes
router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/profile', getProfile)

export default router;
