const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JwtTokens = require("../models/JwtToken");

module.exports = (app) =>{
     /**
   * @swagger
   * /api/profile/{token}:
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
   *         description: email, password
   */
    app.get('/api/profile/:token', async (req, res) =>{
        const token = req.params.token;
        const response = await JwtTokens.findOne({token})

        if(!response){
            return res.status(400).json({status:fail, message:'Invlid token'})
        }
        try{
            const user = jwt.verify(token, process.env.JWT_SECRET);
            const _id = user.id;
            const data = await User.findOne({_id});
            if(data){
                return res.status(200).json({email:data.email, name:data.name});
            }
        } catch(err){
            console.log(err)
            return res.status(400).json({status:'fail',message:'Invalid Token'})
        }
    })
}