import express from 'express'
const router = express.Router()
import AuthRoute from './AuthRoute.js'
import postRoute from './postRoute.js'

router.use('/auth', AuthRoute)
router.use('/post', postRoute)

export default router;