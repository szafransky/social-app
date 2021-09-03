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
    id: { type: String }, 
    image: { type:  String }, 
    bio: { type: String },
    age: { type: Number }
})

//create post model
export default mongoose.model("User", userSchema);

