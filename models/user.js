import mongoos from "mongoose";

const UserSchema = new mongoos.Schema({
    username : {type:String, required:true, unique:true},
    password : {type:String, required:true}
},{collection: 'users'})

const User = mongoos.model('UserSchema',UserSchema)

export default User