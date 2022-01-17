const jwt = require("jsonwebtoken");
const JwtTokens = require("../models/JwtToken");

module.exports = (app) =>{
     /**
   * @swagger
   * /api/logout/{token}:
   *   get:
   *     description: forgot password request to send email!
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         in: path
   *         description: token.
   *         required: true
   *         type: string 
   *     responses:
   *       200:
   *         description: Successfully Logged out!
   */
    app.get('/api/logout/:token', async (req,res)=>{
        const token = req.params.token;
        const response = await JwtTokens.findOne({token});
        if(!response){
            return res.status(400).json({status:'fail', message:'Invalid token'});
        }
        try{
            const user = jwt.verify(token, process.env.JWT_SECRET );
            const delResponse = await JwtTokens.deleteOne({token});
            res.status(200).json({status:'ok',message:'Successfully Logged out!'})
        } catch(err){
            console.log(err)
            return res.status(400).json({status:'fail',message:'Invalid token'})
        }
    })
}