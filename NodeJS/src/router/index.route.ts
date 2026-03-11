import express from 'express'
const router = express.Router()
import AuthRoute from './AuthRoute.js'
import postRoute from './postRoute.js'
import { avatarUpload, postImageUpload } from '../controllers/fileCtr.js';
import { AuthMiddlewares } from '../middlewares/AuthMiddleware.js';
import { upload } from '../utils/multer.js';

router.use('/auth', AuthRoute)
router.use('/post', postRoute)

router.post('/upload/avatar', AuthMiddlewares, upload.single('avatar'), avatarUpload )
router.post('/upload/post', AuthMiddlewares, upload.single('image'), postImageUpload )

export default router;