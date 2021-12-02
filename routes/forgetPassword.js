const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ForgetTokens = require("../models/ForgetToken")
const sendEmail = require("../services/email");
const bcryptjs = require("bcryptjs");

module.exports = (app) =>{
    app.post('/api/forget-password', async(req,res)=>{
        const { email } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({status:'fail',message:'Email does not have account!'});
        }
        try{
            const _id = user._id;
            const forgetToken = jwt.sign({id:_id},process.env.JWT_SECRET);
            res.status(200).json({status:'ok',message:'We have sent you a password reset-link on your Email Address'})
            const addToken = await ForgetTokens.create({
                forgetToken : forgetToken
            });
            sendEmail(email,'Reset your password - authtestexample',`Hi ${user.name}, Please reset your password by clicking on this url : https://www.localhost:3000/reset-password/${forgetToken}`);
        }catch(err){
            console.log(err)
            return res.status(400).json({status:'fail', message:'Something went wrong!'})
        }
    })

    app.post('/api/reset-password', async (req,res)=>{
        const { token, newPassword: newPlainTextPassword} = req.body;
        const forgetToken = await ForgetTokens.findOne({token});
        if(!forgetToken){
            return res.status(400).json({status:'fail', message:'Link Expired'})
        }
        try{
            const user = jwt.verify(forgetToken, process.env.JWT_SECRET);
            const password = await bcryptjs.hash(newPlainTextPassword,10);  
            const _id = user.id;
            const updatePass = await User.updateOne({_id},{
                $set: { password : password}
            });
            console.log('response after password update : ',updatePass);
            res.status(200).json({status:'ok',message:'Password successfully changed'});
        } catch(err){
            console.log(err);
            return res.status(400).json({status:'fail', message:'Invalid Url'})
        }
    })
}