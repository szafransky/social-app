/*

1. First thing, we need to npm init -y to initialise empty package json
2. Important frameworks to install: 
npm install body-parser cors express mongoose nodemon 
3. import dependencies
4. Init app const app = express();
5. Add used frameworks to app

mongodb+srv://admin-blazej:<password>@cluster0.r7tft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/


//authorisation packages to install
//bcrypt
//jsonwebtoken

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv' 

//routes
import postRoutes  from './routes/posts.js'
import userRoutes  from './routes/users.js' 

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

//the code below allows us the use of all endpoints for /posts
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get('/', (req,res) => {
    res.send('<div style="height: 100vh; display: flex; justify-content: center; align-items: center"><h1 style="font-family: Arial, sans-serif">Hello to my social app project API</h1></div>');
})



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening on port: " + PORT); 
        })
    })
    .catch((error) => {
        console.log(error);
    })
 
mongoose.set("useFindAndModify", false);



