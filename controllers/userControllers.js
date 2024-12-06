const RejisterData = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Mail = require("nodemailer/lib/mailer");
const multer = require("multer");
const path = require("path");
const { log } = require("console");
const randomString = require("randomstring");

// storage for multer
const storages = multer.memoryStorage();

//for upload by multer
const upload = multer({ storage: storages }, () => {
  console.log("named successfully");
});


// for strong password

const strongPassword = async (password) => {
  try {
    const securep = await bcrypt.hash(password, 10);
    console.log(securep);
    return securep;
  } catch (error) {
    // sendding status of error
    res.status(404).send();
    console.log(error);
  }
};

// for send mail
const sendVerifyMail = async (name, email, id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "surajjbhardwaj@gmail.com",
        pass: process.env.pass,
      },
    });
    console.log(process.env.pass);
    const mailOption = {
      from: "surajjbhardwaj@gmail.com",
      to: email,
      subject: "for verification mail",
      html:
        " <p1> hii " +
        name +
        ' click here to <a href="https://townofbook.onrender.com/verify?id=' +
        id +
        ' " >  verify </a> your mail</p1>',
    };

    transporter.sendMail(mailOption, function (error, info) {
      if (error) console.log(error);
      else {
        console.log("email has been send ", info.response);
      }
    });
  } catch (error) {
    res.status(404).send();
  }
};



const contactMail = async (req , res) => {

  const name =req.body.namee;
  const email=  req.body.email;
  const Subject = req.body.subject;
  const messege = req.body.messege;

  console.log('name is '+ name + "from "+email+" regarding "+ Subject+" "+messege);
  const admins = ["pandeyyysuraj@gmail.com" , "jyotikumari4442@gmail.com"]


   try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "surajjbhardwaj@gmail.com",
        pass: process.env.pass,
      },
    });
    console.log(process.env.pass);
    

    const mailOption = {
      from: "surajjbhardwaj@gmail.com",
      to: "pandeyyysuraj@gmail.com , jyotikumari4442@gmail.com",
      subject: "Contact support for "+ Subject,
      html:`
          <h2>Dear admin</h2><p> You're recieving this email to solve an issue of <b> ${name} </b> and ${email} ,<br/> He is facing issue regarding ${Subject} </p>
          <b>Discription of issues : </b> <br>
          <p>  ${messege} </p>
          <p>regards</p>
          <a href="https://townofbook.onrender.com" ><p>TOWN OF BOOK</p></a>
      `
       ,
    };
  

    transporter.sendMail(mailOption, function (error, info) {
      if (error) console.log(error);
      else {
        console.log("email recieved ", info.response);
       res.send(`<script>
       alert("Thanks for your messege");
       window.location.href = "/";
     </script>`)
      }
    });
   } catch (error) {
    res.status(404).send();
   }
   
};


//smpt password : slflxbxsbmupufzf
// email : securesally@gmail.com;

const loadRejister = async (req, res) => {
  try {
    res.status(200);
    res.render("rejistration");
    console.log(" kaha ho bro,register route is running");
  } catch (error) {
    console.log(error);
  }
};

const insertUser = async (req, res) => {
  try {
    const spassword = await strongPassword(req.body.password);
    console.log("working");

    const em = req.body.email;
    const dub = await RejisterData.find({email:em});
    const ph = req.body.mobile;
    const dub1 = await RejisterData.find({mobile:ph})
    console.log(em);
     
    if(dub.length>1 || dub1.length>1){
      console.log(dub);
      console.log(dub1);
      res.status(200);
      console.log("dublicate user");
      res.send(`<script>
      alert("user already exist, please login");
      window.location.href="/login"
      </script>`)
    }

    else{

    const user = new RejisterData({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      // hasshed password
      password: spassword,
      image: {
        data:req.file.buffer,
        contentType: req.file.mimetype
      },
      is_admin: 0,
    });

    // console.log("user ", user);
    const saveddata = user.save();

    if (saveddata) {
      console.log("daata saved in mongodb");
      // nodemailer works to verify
      sendVerifyMail(req.body.name, req.body.email, (await saveddata)._id);

      // if we wants to send the json
      //   res.send((await saveddata).toJSON());
      res.status(200);
      res.send(`<script>
      alert("Registration successful!");
      window.location.href = "/login";
    </script>`);
      // res.redirect("/login");
    } else {
      console.log("not saving data");
      res.status(400);
      res.send(`<script>
      alert("something gone wrong! try again");
      window.location.href = "/rejister";
    </script>`);
    }
  }

  } catch (error) {
    console.log(error);
    res.send(`<script>
    alert("something gone wrong! try again");
    window.location.href = "/rejister";
  </script>`);
  }
};

const showing = async(req,res)=>{

try {
  
  const id = req.session.user_id;
  const users = await RejisterData.findOne({_id:id});

  console.log(users.name);
  res.render("bufferimage",{user:users});
      
} catch (error) {
  
  console.log("error");

} 



}

const storage = multer.memoryStorage();
const upload3 = multer({ storage }, () => {
  console.log("named successfully");
});


const updateuser = async (req, res) => {
  try {
    const id = req.session.user_id;
    const name = req.body.newname;
    const email = req.body.newemail;
    const mobile = req.body.mobile;

    const updatedUser = {
      name: name,
      email: email,
      mobile: mobile
    };

   
      if (req.file) {
        updatedUser.image={
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
      }

    const user = await RejisterData.findByIdAndUpdate(id, updatedUser);

    if (user) {
      res.send(
        `<script>alert("User updated"); window.location.href="/image"</script>`
      );
    } else {
      res.send(
        `<script>alert("User not updated, please try again"); window.location.href="/image"</script>`
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send( `<script>alert("User not updated, please try again \n internal server error "); window.location.href="/image"</script>`);
  }
};


const verifyl = async (req, res) => {
  try {
    const updateInfo = await RejisterData.updateOne(
      { _id: req.query.id },
      { $set: { is_varified: 1 } }
    );
    console.log(updateInfo);
    res.status(200);
    res.render("verifiedemail");
    console.log("user verified");
  } catch (error) {
    console.log(error);
  }
};

// for verify login
const verifylogin = async (req, res) => {
  try {
    req.session.redirected = false;
    const email = req.body.email;
    console.log("email is ", email);

    const Pasword = req.body.password;
    console.log("password is ", Pasword);
    const userdata = await RejisterData.findOne({ email: email });
    if (userdata) {
      //comparing bcrypt passwords
      const match = await bcrypt.compare(Pasword, userdata.password);

      //if password is matching
      if (match) {
        // if user is not verified
        // for future
        // if (userdata.is_varified === 0) {
        //     res.status(200);
        //   res.render("login", { messege: "user is not verified" });
        //   console.log("fault user");
        // } else {
        //   req.session.user_id = userdata._id;
        //   res.status(200);
        //   res.redirect("/home");

        // for home  without verification
          req.session.user_id = userdata._id;
          res.status(200);
         return res.redirect("/home");
        
      } else {
        res.status(200);
        console.log("wrong password or email");
        res.redirect("loginerr");
      }
    } else {
        res.status(200);
        console.log("wrong password or email 91");
      res.redirect("loginerr");
    }
  } catch (error) {
    console.log(error);
  }
};

const messages = {
  messege1: 'login/signup',
  message2: 'email or password is incorrect',
  messege3: 'password and confirm passwords are not maching'
};


// for login error
const loginerr = async (req,res)=>{
   try {
    
    res.status(200);
    res.render("login",{messages: messages},);

   } catch (error) {
    res.status(400);
    console.log(error);
    console.log("error at 178 usercontroller");
   }

}


// for login

const login = async (req, res) => {
  try {
    res.status(200);
    res.render("login");
  } catch (error) {
    console.log("error " + error);
  }
};

// for send mail
const sendForgetMail = async (name, email, id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "surajjbhardwaj@gmail.com",
        pass: process.env.pass,
      },
    });
    console.log(process.env.pass);
    const mailOption = {
      from: "surajjbhardwaj@gmail.com",
      to: email,
      subject: "Password reset mail",
      html:
        " <p1> hii " +
        name +
        ' click here to <a href="https://townofbooks.onrender.com/resetpassword?id=' +
        id +
        ' " >  reset </a> your password</p1>',
    };

    transporter.sendMail(mailOption, function (error, info) {
      if (error) console.log(error);
      else {
        console.log("email has been send ", info.response);
      }
    });
  } catch (error) {
    res.status(404).send();
  }
};



// forget password
const forgetPassword = async (req,res) => {

  const id = req.session.user_id;
  const user = await RejisterData.findOne({_id:id});
  res.render("forget",{user:user});
}

const sendResetPasswordEmail = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await RejisterData.findOne({ email: email }); // Use findOne instead of find to retrieve a single document
    const token = randomString.generate();
    const us = await RejisterData.updateOne({email:email},{$set:{token:token}})


    if (user) { // Check if user exists (findOne will return null if no user found)
      console.log("user is ", user.name);
      sendForgetMail(user.name, user.email, token);
      res.status(200).send("Check your email for password reset instructions.");
    } else {
      console.log("no user");
      res.status(400).send(`
        <script>
          alert("User does not exist. Please provide a valid email.");
          window.location.href="/forget";
        </script>
      `);
    }
  } catch (error) {
    res.status(500).send(`
      <script>
        alert("Internal server error. Please try again later.");
        window.location.href="/";
      </script>
    `);
    console.log("Error at forget post", error.message);
  }
}





const resetPassword = async (req, res) => {
  try {
    const token = req.query.id;
    const user = await RejisterData.findOne({token:token});
    res.status(200);
    console.log("here is the tokken",token);
    res.render("resetPassword", {token:token,user:user});
    console.log("in the last stage");
  } catch (error) {
    console.log(error);
  }
};


const changePassword = async (req, res) => {
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  const token = req.body.token;

  if (cpassword === password) {
    try {
      const newpass = await strongPassword(password);
      const user = await RejisterData.findOne({ token }).exec();

      if (!user) {
        return res.send(`
          <script>
            alert("Invalid token.");
            window.location.href = "/";
          </script>
        `);
      }

      user.password = newpass;
      user.token = '';

      const updatedUser = await user.save();

      if (updatedUser) {
        // console.log(updatedUser);
        console.log("Password updated:", password);
        return res.send(`
          <script>
            alert("Password changed successfully.");
            window.location.href = "/login";
          </script>
        `);
      } else {
        console.log("No change");
        return res.send(`
          <script>
            alert("Failed to update password.");
            window.location.href = "/";
          </script>
        `);
      }
    } catch (error) {
      console.log("Error updating password:", error.message);
      return res.status(500).send(`
        <script>
          alert("Internal server error. Please try again later.");
          window.location.href = "/";
        </script>
      `);
    }
  } else {
    console.log("Password doesn't match");
    return res.send(`
      <script>
        alert("Passwords do not match.");
        window.location.href = "/";
      </script>
    `);
  }
};










//for load home
const loadhome = async (req, res) => {
    res.status(200);
    const id = req.session.user_id;
    const user = await RejisterData.findOne({_id:id});
    // console.log(user);
  res.render("home",{user:user});
  console.log("successfully logined");
};

// for logout
const logout = async (req,res)=>{
   
    try {
        
        req.session.destroy();
        res.redirect("/login");

    } catch (error) {
        console.log("error at logout",error);
    }

}

// for contact load
const loadContact = async(req,res)=>{
    try {
      res.status(200);
      const id = req.session.user_id;
      const user = await RejisterData.findOne({ _id: id });
      
      if (user) {
        res.render("contact",{user:user});
      }
      else {
        res.render("contact");
      }
    } catch (error) {
        console.log("error is ",error);
    }
}

//for view load

const loadview = async(req,res)=>{
    try {
      res.status(200);
      const id = req.session.user_id;
      const user = await RejisterData.findOne({_id:id});
      console.log(user);
    res.render("view",{user:user});
    } catch (error) {
        console.log("error is ",error);
    }
}

// for book rent load
const loadbookrentt = async(req,res)=>{
    try {
      res.status(200);
      const id = req.session.user_id;
      const user = await RejisterData.findOne({_id:id});
      // console.log(user);
    res.render("bookrentt",{user:user});
    } catch (error) {
        console.log("error is ",error);
    }
}

// faltu ka peace
const  loadnewbook = async (req,res)=>{

     try {
      res.render("product");
     } catch (error) {
        res.status(400);
      console.log("error here ",error);
     }


}  

const loadTeam = async (req, res) => {
  try {


    console.log(req.session.id);
   
      const id = req.session.user_id;
      const user = await RejisterData.findOne({ _id: id });
    
    
    if (user) {
      console.log(`it ss working ${user}`);
      res.render("team", { user: user });
    }

    else {
      console.log("it is not working");
      res.render("team");
      
    }
  } catch (error) {
    console.log("error at team page ", error);
    res.status(400);
    res.send("error at laoding team page");

  }
}






module.exports = {
  loadRejister,
  insertUser,
  verifyl,
  login,
  loginerr,
  verifylogin,
  loadhome,
  logout,
  loadContact,
  contactMail,
  loadview,
  loadnewbook, //faltu ka hai ise product route me already kiya tha
  loadbookrentt,
  upload,
  upload3,
  showing,
  updateuser,
  forgetPassword,
  sendResetPasswordEmail,
  resetPassword,
  changePassword,
  loadTeam
};
