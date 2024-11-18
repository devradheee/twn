const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");


const productdata = new mongoose.Schema({
          
        bookName:{
            type:String,
            required:true
        },
        tittle:{
            type:String,
            required:true
        },
        about:{
            type:String,
            required:true
        },
        authorName:{
            type:String,
            required:true
        },
        vender_id:{
            type:String,
            required:true
        },
       rentPrice:{
            type:String,
            required:true
       },
       location :{
            type:String,
            required:true
       },
       image:{
            data:Buffer,
            contentType:String,
            // required:true
       },
       date:{
        type:Date,
        default: Date.now
       },
       rating:{
            type:Decimal128,
            default:0.0 
       },
       review :{
        type : String,
        default : " "
       },
       is_popular:{
           type:Number,
           default:0
       },
       buy_times:{
        type:Number,
        default:0
       },
       fav_times:{
        type:Number,
        default:0
       }
});

const product = mongoose.model("product",productdata);

module.exports = product;