const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    
    // followers:[{type:ObjectId,ref:"User"}],
    // following:[{type:ObjectId,ref:"User"}]
})

const userModel = mongoose.model("User",userSchema)


module.exports = userModel