const User = require("../models/user");
const jwt = require("jsonwebtoken");
const VerifyTokens = require("../models/VerifyToken")

module.exports = (app) =>{
     /**
   * @swagger
   * /api/verify-email/{verifyToken}:
   *   get:
   *     description: verify user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: verifyToken
   *         in: path
   *         description: verify token.
   *         required: true
   *         type: string 
   *     responses:
   *       200:
   *         description: Your email successfully verified, login to get started!
   */
    app.get('/api/verify-email/:verifyToken', async (req,res)=>{
        const verifyToken = req.params.verifyToken;
        const verifyTokenDoc = await VerifyTokens.findOne({verifyToken});
        try{
            const user = jwt.verify(verifyToken,process.env.JWT_SECRET);
            if(!verifyTokenDoc){
                return res.status(200).json({status:'ok',message:'this email is already verified'})
            }
            const _id = user.id;
            const userDoc = await User.updateOne({_id},{
                $set: {verified: true}
            })
            res.status(200).json({status:'ok',message:'Your email successfully verified, login to get started!'});
        }catch(err){
            return res.status(400).json({status:'fail',message:'Invalid URL'});
        }
        const _id = verifyTokenDoc._id;
        const delResponse = await VerifyTokens.deleteOne({_id});
    })
}