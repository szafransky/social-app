import mongoose from 'mongoose'



//create post schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    author: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    }, 
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

//create post model
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;