const product = require("../models/productModel");
const users = require("../models/userModel");
const nodemailer = require("nodemailer")
// multer
const multer = require("multer");
const path = require("path");
const { log } = require("console");





const appendProduct = async (req,res)=>{
    
    // for adding new data
    res.status(200);
    const id = req.session.user_id;
    const user = await users.findOne({_id:id});
    // console.log(user);
    res.render("product",{user:user});

}


// storage for multer
const storage = multer.memoryStorage();

//for upload by multer
const upload = multer({ storage: storage }, () => {
  console.log("named successfully");
});



const insertProduct = async (req,res)=>{
        
     try {
        
        const productdata = new product({
          bookName: req.body.bookName,
          tittle:req.body.tit,
          about:req.body.about,
          authorName:req.body.authorName,
          vender_id:req.session.user_id,
          rentPrice:req.body.rentPrice,
          location:req.body.location,          
          image: {
            data:req.file.buffer,
            contentType: req.file.mimetype
          }
        //   coverImages: req.file.filename,
        });
        
        console.log("product data",productdata);

        const data = await productdata.save();
        if(data){
            console.log("book data added");
        
            // for a mail
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                  user: "	surajjbhardwaj@gmail.com",
                  pass: "wznijjgptiqmpdak",
                },
              });
               
              const vender =await users.findOne({_id:req.session.user_id});
              console.log("email of vender is ",vender.email);

              const mailOption = {
                from: "surajjbhardwaj@gmail.com",
                to: vender.email,
                subject: "for book submission",
                html:
                  " <p1> hii " +
                  vender.name +
                  ' thank you for adding your book,we willl verify and inform you soon </p1>',
              };
          
              transporter.sendMail(mailOption, function (error, info) {
                if (error) console.log(error);
                else {
                  console.log("email has been send ", info.response);
                }
              });

            return res.redirect('/home');
        }else{
            console.log("failed during saving data");
            res.status(404);
            res.redirect("/appendbook");
        }
        
     } catch (error) {
        console.log("error at insertProduct ",error);
     }

}

const data = {
  user: null,
  product: null,
};
const getProducts = async (req, res) => {
  try {
    const id = req.session.user_id;
    data.user = await users.findOne({ _id: id });

    if (data.user) {
      data.product = await product.find({}); // Convert cursor to array
      console.log(data);
      res.status(200).render("book", { data: data });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// productControllers.js

const getProductDetails = async (req, res) => {
  try {

     const id = req.session.user_id;
    data.user = await users.findOne({ _id: id });

    if (data.user) {

      const productId = req.params.productId; // Assuming you have a parameter for the product ID
      data.product = await product.findOne({ _id: productId });

      if (data.product) {
        res.status(200).render("detailedBook", { data: data });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } else {
      res.status(400).send("user not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




 
module.exports = {
  insertProduct,
  appendProduct,
  upload,
  getProducts,
  getProductDetails
};
