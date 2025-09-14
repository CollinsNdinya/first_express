import express from 'express'
import { getPost, getPosts, createPost, updatePost, deletePost } from '../controllers/postController.js'

const router = express.Router()

//get all posts
router.get('/', getPosts)

//get a single Post
router.get('/:id', getPost)

//Update Post
router.put('/:id', updatePost)

//Create a new Post
router.post( '/', createPost)


router.delete( '/:id', deletePost)





export default router