import express from 'express'
import { getAllPost, getPostById, updatePostById, deletePostById,createNewPost } from '../controllers/postCtr.js';

const router = express.Router()

//post routes
router.get('/', getAllPost);   // for get particular user post '/api/post?userId='
router.post('/', createNewPost);
router.get('/:id', getPostById);
router.put('/:id', updatePostById);
router.delete('/:id', deletePostById);

export default router; 
