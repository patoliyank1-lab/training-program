import express from 'express'
import { 
    getAllPost, 
    getPostById, 
    updatePostById, 
    deletePostById,
    createNewPost 
} from '../controllers/postCtr.js';
import { postValidator, updatePostValidator } from '../middlewares/PostValidator.js';

const router = express.Router()

//post routes
router.get('/', getAllPost);   // for get particular user post '/api/post?userId='
router.post('/',postValidator, createNewPost);
router.get('/:id', getPostById);
router.put('/:id',updatePostValidator , updatePostById);
router.delete('/:id', deletePostById);

export default router; 
