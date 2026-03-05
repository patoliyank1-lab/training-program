import express from 'express'
import { loginUser, registerUser } from '../controllers/userCtr.js'

const router = express.Router()


// login user route
router.post('/login', loginUser)

// register user route
router.post('/register', registerUser)


export default router;



