const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const valid = require("../utils");

module.exports = (app) =>{
    app.get('/api/login', async (req,res)=>{
        const{email, password} = req.body;
        console.log('logging with :',req.body);
        const user = await User.findOne({email}).lean();
        if(!user){
            return res.status(400).json({status:'fail',message:'Email does not have account!'})
        }
        if(await bcryptjs.compare(password, user.password)){
            return res.status(200).json({status:'ok',message:'Logged IN'});
        }
        return res.status(400).json({status:'fail',message:'Invalid email and password !'})
    })
}