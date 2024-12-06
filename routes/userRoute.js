const bodyParser = require("body-parser");
const express = require("express");
const user_route = express();
const session = require("express-session");
const product_route = require("./productRoute");
// const cors = require("cors")


// for middleware
const auth = require("../middleware/auth");

// for cloudinary server
const server = require("../server/config/cloudinaryConfig");

//for session seting
user_route.use(session({
  secret: process.env.Secret,
  resave: true,
  saveUninitialized: true
}));

// user_route.use(session({ secret: process.env.Secret }));

// allow cross-origin requests
// user_route.use(cors());

//ejs
user_route.set("view engine", "ejs");
user_route.set("views", "./views/users");

// for body parser
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// controllers
const userController = require("../controllers/userControllers");
const emailController = require("../controllers/emailController");



// -REQUESTS-

//get requests
user_route.get("/rejister",auth.islogout, userController.loadRejister);

// for verify route
user_route.get("/verify", userController.verifyl);

//for error in login
user_route.get("/loginerr",userController.loginerr);

//for home route
user_route.get("/home",auth.islogin , userController.loadhome);
user_route.get("/bookrentt",auth.islogin, userController.loadbookrentt);
user_route.get("/view",auth.islogin,userController.loadview);

user_route.get("/contact",userController.loadContact);

// for logut
user_route.get("/logout",auth.islogin,userController.logout);

// for home
user_route.get("/",auth.islogin, userController.loadhome);

// for login route
// user_route.get("/",auth.islogout, userController.login);
user_route.get("/login" ,auth.islogout, userController.login);
user_route.get("/image",auth.islogin,  userController.showing);
user_route.get("/forget",auth.islogout, userController.forgetPassword);
user_route.get("/resetpassword", userController.resetPassword);

//for post routes
user_route.post("/resetpassword", userController.changePassword);
user_route.post("/forget", auth.islogout, userController.sendResetPasswordEmail);
user_route.post("/rejister",auth.islogout, userController.upload.single("image"), userController.insertUser);

user_route.post("/login", userController.verifylogin);

user_route.post("/contact",emailController.recieveMail);
user_route.post("/updateuser",auth.islogin, userController.upload.single("image"),userController.updateuser);


//for team page
user_route.get("/team",userController.loadTeam);




//for html ejs
user_route.get("/y",async(req,res)=>{
  res.render("html");
})

user_route.get("/newnn/n",(req,res)=>{
  res.send("heyy");
})

module.exports = user_route;
