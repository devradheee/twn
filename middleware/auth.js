// to check login or not

const islogin = async (req, res, next) => {
    if (!req.session.redirected) {
      // req.session.redirected = true;
      if (await req.session.user_id) {
       console.log("yes user is login");
       next();
      } else {

        res.send(`<script>
         alert("you need to login first");
         window.location.href = "/login";
       </script>`);
      }
    } else {
      next();
    }
  };

const islogout = async (req, res, next) => {
    try {
      if (await req.session.user_id) {
        console.log("na na user logout nhi hai");
        res.send(`<script>
        alert("you are not allowed to visit here");
        window.location.href = "/";
      </script>`);
        
      }else{
        console.log("case ho rha");
        next();

      }
    } catch (error) {
      console.log("error at middleware", error);
    }
};

// to check kyc verification  
const kycVerified = async (req,res,next)=>{

    try {
     const userdata = await user.findOne({_id : req.session.user_id});
     if(userdata.is_varified===0){
     return res.send("please wait for verify, you're not eligible to rent a book");
     }
     next();
    } catch (error) {
     console.log("error at buy time ",error);
    }

};



module.exports = {
    islogin,
    islogout,
    kycVerified
  }
