const multer = require("multer");
const path = require("path");

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/coverImage");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/mainImage");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload1 = multer({
  storage: storage1,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const upload2 = multer({
  storage: storage2,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const uploadImages = (req, res,next) => {
  upload1.array("images1", 5, function (err, images1) {
    if (err) {
      console.log("Error: ", err);
      res.status(400).send("Error uploading images1");
    } else {
      upload2.single("images2", function (err, images2) {
        if (err) {
          console.log("Error: ", err);
          res.status(400).send("Error uploading images2");
        } else {
          console.log("Images uploaded successfully");
          res.status(200);
        }
      });
    }
  });
  next();
};

module.exports = {
  uploadImages
};
