const mongoos = require('mongoose');

const VerifyTokenSchema = new mongoos.Schema({
    verifyToken: {type:String,required:true,unique:true}
},{collection:'verifyTokens'})

const VerifyTokens = mongoos.model('VerifyTokenSchema',VerifyTokenSchema);

module.exports = VerifyTokens;