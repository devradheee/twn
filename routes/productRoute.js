const bodyParser = require("body-parser");
const express = require("express");
const product_route = express();
const session = require("express-session");
const ejs = require("ejs");
const middleware = require("../middleware/uploadMiddleware");


// for middleware
const auth = require("../middleware/auth");

// controllers
// const userController = require("../controllers/userControllers");
const  ProductController = require("../controllers/productControllers");


product_route.use(session({
    secret: process.env.Secret,
    resave: true,
    saveUninitialized: true
  }));


  //ejs
 product_route.set("view engine", "ejs");
 product_route.set("views", "./views/users");

product_route.get("/products", auth.islogin, ProductController.getProducts);
product_route.get(
  "/product/:productId",
  auth.islogin,
  ProductController.getProductDetails
);

 product_route.get("/appendbook",auth.islogin,ProductController.appendProduct);
//  product_route.get("/appendbook",auth.islogout,userController.login);

//for post route
// ,auth.islogin
 product_route.post("/appendbook" ,auth.islogin,ProductController.upload.single("mainImage"), ProductController.insertProduct);

 
 module.exports = product_route;