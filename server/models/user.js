import mongoose from 'mongoose'



//create post schema
const userSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    id: { type: String }
})

//create post model
export default mongoose.model("User", userSchema);

