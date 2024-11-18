// requiring mongoose for connection
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
        // required:true
    },
    date:{
        type:Date,
        default: Date.now
       },
    is_admin:{
        type:Number,
        required:true
    },
    is_varified:{
        type:Number,
        default:0
    },
    token:{
        type:String,
        default:''
    },
},{timestamps:true});

// console.log(userSchema);
const User= mongoose.model("User",user);

module.exports= User;
// module.exports=mongoose.model("User",userSchema);