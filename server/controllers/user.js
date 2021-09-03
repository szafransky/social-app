 import bcrypt from 'bcryptjs'
 import jwt from 'jsonwebtoken'
 import User from '../models/user.js'
 import mongoose from 'mongoose'



 export const signin = async (req, res) => {

    const { email, password } = req.body;

    console.log('In signin request');
    console.log(req.body);

    try {
        
        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json( {message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."});

        const token = jwt.sign( {email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        console.log("Token:");
        
        console.log(token);

        res.status(200).json({ result: existingUser, token });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
        
    }
 }

 export const signup = async (req, res) => {

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    console.log('In signup request');
    console.log(req.body);
    
    

    try {
        const existingUser = await User.findOne({ email });

        console.log('user in log');
        
        console.log(existingUser);
        

        if(existingUser) return res.status(400).json({ message: "User already exist."});

        if(password !== confirmPassword) return res.status(400).json({ message: "Password do not match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign( {email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        console.log("before success");
        

        res.status(200).json({ result, token });

        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Something went wrong.", error: error });
    }
     
}


export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const updateUser = async (req, res) => {

    const { id: _id } = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that ID');

    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });

    res.json(updatedUser);

} 


export const getUsers = async (req, res) => {
 
    try {
        const users = await User.find();
        res.status(200).json(users);

    }catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Something went wrong.", error: error });
    }
}

