import express from 'express'
import { loginUser, registerUser } from '../controllers/AuthCtr.js'
import { AuthValidator, loginValidator, registerValidator } from '../middlewares/AuthValidator.js'

const router = express.Router()

// Auth routes
router.post('/login', loginValidator, AuthValidator, loginUser)
router.post('/register',registerValidator, AuthValidator  , registerUser)
// router.get('/profile', getProfile)

export default router;
