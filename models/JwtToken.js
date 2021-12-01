const mongoos = require("mongoose");

const JwtTokenSchema = new mongoos.Schema({
    jwtToken : {type:String, required:true, unique:true}
},{collection:'jwtTokens'});

const JwtTokens = mongoos.model('JwtTokenSchema',JwtTokenSchema);

module.exports = JwtTokens;