const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ForgetTokens = require("../models/ForgetToken")
const sendEmail = require("../services/email");
const bcryptjs = require("bcryptjs");
const Urls = require("../utils/urls");

module.exports = (app) =>{
    /**
   * @swagger
   * /api/forget-password/{email}:
   *   get:
   *     description: forgot password request to send email!
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         in: path
   *         description: User's email.
   *         required: true
   *         type: string 
   *     responses:
   *       200:
   *         description: We have sent you a password reset-link on your Email Address
   */
    app.get('/api/forget-password/:email', async(req,res)=>{
        const email = req.params.email;
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
            sendEmail(email,'Reset your password - authtestexample',`Hi ${user.name}, Please reset your password by clicking on this url : ${Urls.WebUrl}/reset-password?token=${forgetToken}`);
        }catch(err){
            console.log(err)
            return res.status(400).json({status:'fail', message:'Something went wrong!'})
        }
    })

    /**
   * @swagger
   * /api/reset-password:
   *   post:
   *     description: update password request
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token got from reset password link.
   *         required: true
   *         type: string
   *         in : body
   *       - name: newPassword
   *         description: User's newPassword.
   *         required: true
   *         type: string
   *         in : body
   *     responses:
   *       200:
   *         description: Password successfully changed
   */

    app.post('/api/reset-password', async (req,res)=>{
        const { token, newPassword: newPlainTextPassword} = req.body;
        const forgetToken = await ForgetTokens.findOne({token});
        if(!forgetToken){
            return res.status(400).json({status:'fail', message:'Link Expired'})
        }
        try{
            const user = jwt.verify(forgetToken.forgetToken, process.env.JWT_SECRET);
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
        const _id = forgetToken._id;
        const delResponse = await ForgetTokens.deleteOne({_id})
    })
}