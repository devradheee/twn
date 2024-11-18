const express = require("express");
const multer = require("multer");
const path = require("path");
const Book = require("../models/productModel");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array("coverImages", 5);

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const bookController = {
  addBook: (req, res) => {
    upload(req, res, (error) => {
      if (error) {
        res.status(400).json({
          message: error
        });
      } else {
        const coverImages = [];
        req.files.forEach((file) => {
          coverImages.push(file.filename);
        });
        const newBook = new Book({
          bookName: req.body.bookName,
          tittle:req.body.tittle,
          about:req.body.about,
          authorName:req.body.authorName,
          vender_id:req.session.user_id,
          rentPrice:req.body.rentPrice,
          location:req.body.location,          
          bookCoverImage: req.file.filename,
          coverImages: coverImages
        });
        newBook.save((error) => {
          if (error) {
            res.status(500).json({
              message: error
            });
          } else {
            res.status(201).json({
              message: "Book added successfully"
            });
          }
        });
      }
    });
  }
};

// for load
module.exports ={
     bookController
     }
