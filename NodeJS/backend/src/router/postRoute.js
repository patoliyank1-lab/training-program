import express from 'express'
import { getAllPost, getPostById, updatePostById, deletePostById } from '../controllers/postCtr.js';

const router = express.Router()

//post routes
router.get('/', getAllPost);
router.get('/:id', getPostById);
router.put('/:id', updatePostById);
router.delete('/:id', deletePostById);

export default router; 
