import mongoose from 'mongoose'



//create post schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    author: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    }, 
    createdAt: {
        type: Date,
        default: new Date()
    }
})

//create post model
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;