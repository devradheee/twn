
const mongoose=require("mongoose");

const data = mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }


 });

const Data = mongoose.model("Data",data);

//export this model
module.exports=Data;

//in another way
// module.exports=mogoose.module("Data",data);