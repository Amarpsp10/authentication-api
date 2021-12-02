const jwt = require("jsonwebtoken");
const JwtTokens = require("../models/JwtToken");

module.exports = (app) =>{
    app.get('/api/logout', async (req,res)=>{
        const { token } = rq.body;
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