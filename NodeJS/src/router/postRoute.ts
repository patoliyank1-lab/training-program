import express from 'express'
import { 
    getAllPost, 
    getPostById, 
    updatePostById, 
    deletePostById,
    createNewPost 
} from '../controllers/postCtr.js';
import { postValidator, updatePostValidator } from '../middlewares/PostValidator.js';
import { AuthMiddlewares } from '../middlewares/AuthMiddleware.js';
import { isAdmin } from '../utils/isAdmin.js';

const router = express.Router()

//post routes
router.get('/', getAllPost);   // for get particular user post '/api/post?userId='
router.post('/', AuthMiddlewares ,postValidator, createNewPost);
router.get('/:id', getPostById);
router.put('/:id',AuthMiddlewares ,updatePostValidator , updatePostById);
router.delete('/:id',AuthMiddlewares, isAdmin , deletePostById);

export default router; 
