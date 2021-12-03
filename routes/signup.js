const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const valid = require("../utils");
const sendEmail = require("../services/email");
const jwt = require("jsonwebtoken");
const VerifyTokens = require("../models/VerifyToken")
const Urls = require("../utils/urls");

module.exports = (app) =>{

    app.post('/api/signup', async (req,res)=>{
        const{name, password:plaintextPassword, email} = req.body;
        console.log('registering user with ',req.body);
        if(!valid.emailValid(email)){
            return res.status(400).json({status:'fail',message:'Invalid email address!'})
        }
        if(!valid.passValid(plaintextPassword)){
            return res.status(400).json({status:'fail',message:'Password must be eight characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character.'})
        }
        const password = await bcryptjs.hash(plaintextPassword,10)
        console.log('your password after bcrypt: ',password);
        try{
            const response = await User.create({
                name: name,
                email: email,
                username: email,
                password: password
            })
            res.status(201).json({status:"ok",message:'Successfully Registered'})
            const verifyToken = jwt.sign({id:response._id},process.env.JWT_SECRET);
            const addToken = await VerifyTokens.create({
                verifyToken: verifyToken
            })
            sendEmail(email,'Verify your email address- authtestexample',`Hi ${name}, Please Verify your email address by clicking on this url : ${Urls.WebUrl}/verify-email?token=${verifyToken}`);
        }catch(err){
            console.log(err)
            if(err.code===11000)
                return res.status(400).json({status:"fail",message:'Email already exists!'})
            else 
                return res.status(400).json({status:"fail",message:"Something went wrong!"})
        }
    })
}