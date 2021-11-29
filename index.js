import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./models/user.js";
import bcrypt from 'bcryptjs'
import { Jwt } from "jsonwebtoken";

// App config 
const app = express();
const port = process.env.PORT || 8081;
const connectionURL = `mongodb+srv://amarpsp10:Amarpsp10@signup.oj6id.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use('/',express.static('/static'));
app.use(bodyParser.json());

// Middleware

// Db config

mongoose.connect(connectionURL,{
    useNewURLParser : true,
    useUnifiedTopology : true
})

// Api Endpoints

app.get('/',(req, res) => {
    res.status(200).send('hello world');
})

app.post('/api/register', async(req, res)=>{
    const {username, password: plainTextPassword} = req.body
    const password = await bcrypt.hash(plainTextPassword ,10);
    
    try{
        const response = await User.create({username,password})
        console.log("user created successfully :"+response)
    } catch(error){
        console.log(JSON.stringify(error))
        if(error.code === 11000){
            return res.status(500).json({status:'error',error:'Username already exits'})
        }
        throw error
    }
    res.json({status:"ok"})
})


// Listener

app.listen(port,()=>{
    console.log(`server is started on localhost:${port}`);
});
