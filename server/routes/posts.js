import express from 'express'
import { getPosts, createPost } from '../controllers/posts.js'

//router for posts
const router = express.Router();

//first get method
//router is just setting up the paths. With the use of controllers we are also implementing logic to the requests
router.get("/", getPosts);
router.post("/", createPost);


export default router;