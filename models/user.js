import mongoos from "mongoose";

const UserSchema = new mongoos.Schema({
    email : {type:String, required:true, unique:true},
    username : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    name : {type:String, required:false},
    gender : {type:String, required:false},
    dob : {type:Date, required:false}
},{collection: 'users'})

const User = mongoos.model('UserSchema',UserSchema)

export default User