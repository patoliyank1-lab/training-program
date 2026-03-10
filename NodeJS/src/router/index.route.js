import express from 'express'
const router = express.Router()
import userRoute from './userRoute.js'
import postRoute from './postRoute.js'

router.use('/auth', userRoute)
router.use('/post', postRoute)

export default router;