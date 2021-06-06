/*

1. First thing, we need to npm init -y to initialise empty package json
2. Important frameworks to install: 
npm install body-parser cors express mongoose nodemon 
3. import dependencies
4. Init app const app = express();
5. Add used frameworks to app

mongodb+srv://admin-blazej:<password>@cluster0.r7tft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//routes
import postRoutes  from './routes/posts.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

//the code below allows us the use of all endpoints for /posts
app.use("/posts", postRoutes);





const CONNECTION_URL = "mongodb+srv://admin-blazej:MyNewPassword123@cluster0.r7tft.mongodb.net/socialmediaapp?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening on port 5000");
        })
    })
    .catch((error) => {
        console.log(error);
    })
 
mongoose.set("useFindAndModify", false);



