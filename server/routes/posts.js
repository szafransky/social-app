import express from 'express'
import { commentPost, getPost, getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch } from '../controllers/posts.js'
import  auth from '../middleware/auth.js'

//router for posts
const router = express.Router();

//first get method
//router is just setting up the paths. With the use of controllers we are also implementing logic to the requests

//get all post route
router.get("/", getPosts);
//create post route
router.post("/", auth, createPost);
//update post route
router.patch("/:id", auth, updatePost);
//delete route
router.delete("/:id", auth, deletePost);
//like route
router.patch("/:id/likePost", auth, likePost);
//fetch by search
router.get("/search", getPostsBySearch);
// get single post
router.get("/:id", getPost);
//comment route
router.post("/:id/commentPost", auth, commentPost);



export default router;