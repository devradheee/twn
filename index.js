// require all npm 
const express=require("express");
const mongoose= require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");
// const cors = require("cors");

//dot env file equipment
require("dotenv").config();
const PORT= process.env.PORT || 5001;
console.log("URI is : ",process.env.URI);


//routes
const userRoute = require("./routes/userRoute");
const user_route = require("./routes/userRoute");

// for product route
const productRoute = require("./routes/productRoute");
const product_route = require("./routes/productRoute");

// using app
const app=express();


//for static folder public
app.use(express.static("public"));

// for axios
// app.use(cors);

//for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// for ejs
// app.set('view engine' , ejs);
app.set('view engine', 'ejs');


//mongoose connection
mongoose.set({strictQuery:true});
mongoose.connect(process.env.URI,()=>{

    try {
        console.log("database is connected");
    } catch (error) {
        console.log("theres an error "+error);
    }
});
  

 
//for user route
 app.use("/",userRoute);
 app.use("/",productRoute);

// server listen on port
app.listen(PORT,()=>{
   
        console.log(`server is running at http://localhost:${PORT}`)
    
}) 