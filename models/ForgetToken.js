const mongoos = require("mongoose");

const ForgetTokenSchema = new mongoos.Schema({
    forgetToken : {type:String, required:true, unique:true}
},{collection:'forgetTokens'});

const ForgetTokens = mongoos.model('ForgetTokenSchema',ForgetTokenSchema);

module.exports = ForgetTokens;