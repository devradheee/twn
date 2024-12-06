const RejisterData = require("../models/userModel");
const Mail = require("nodemailer/lib/mailer");
const nodemailer = require("nodemailer");






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
  
  
  
  const contactMail = async (name,email,Subject,messege) => {
  
    // const name =req.body.namee;
    // const email=  req.body.email;
    // const Subject = req.body.subject;
    // const messege = req.body.messege;
  
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
        if (error){ console.log("error at 90 ",error);
              return;
        }
        else {
          console.log(" admin recieved email ", info.response);
        //  res.send(`<script>
        //  alert("Thanks for your messege");
        //  window.location.href = "/";
    //    </script>`)
    return;
        }
      });
     } catch (error) {
    //   res.status(404);
    console.log(error);
    return;
     }
     
  };


  const recieveMail = async (req , res) => {
  
    const name =req.body.namee;
    const email=  req.body.email;
    const Subject = req.body.subject;
    const messege = req.body.messege;
  
    const succuess = contactMail(name,email,Subject,messege);
    console.log(succuess);
  
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
        subject: "Contact support for "+ Subject,
        html:`
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
          <title></title>
          
            <style type="text/css">
              @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
        
          .u-row .u-col-100 {
            width: 600px !important;
          }
        
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table, td { color: #ffffff; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-font-size { font-size: 28px !important; } #u_content_text_8 .v-container-padding-padding { padding: 10px 10px 0px !important; } #u_content_social_1 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_content_text_deprecated_5 .v-container-padding-padding { padding: 10px 10px 20px !important; } }
            </style>
          
          
        
        <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css2?family=Bitter:wght@600&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
        
        </head>
        
        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #ffffff">
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
            
        
        <div class="u-row-container" style="padding: 0px;background-image: url('https://raw.githubusercontent.com/SurajjBhardwaj/twn/master/public/emailImages/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent">
          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('https://raw.githubusercontent.com/SurajjBhardwaj/twn/master/public/emailImages/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
          
        <table id="u_content_heading_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:200px 10px 180px;font-family:'Open Sans',sans-serif;" align="left">
                
          <h1 class="v-font-size" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-family: Bitter; font-size: 30px; font-weight: 400;"><strong>Contact support</strong></h1>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table id="u_content_text_8" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 30px;font-family:'Open Sans',sans-serif;" align="left">
                
          <div class="v-font-size" style="font-size: 14px; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%;"><strong>Dear ${name}</strong>,</p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;">Thank you for reaching out to <bold>Town of book</bold> We are writing to confirm that we have received your recent email seeking assistance. Your message is important to us, and we appreciate the opportunity to help you.</p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;">At Town of book, we are dedicated to providing prompt and effective solutions to our valued clients. Our team has reviewed your request, and we want to assure you that we are committed to addressing your concern promptly.</p>
        <p style="line-height: 140%;">We understand the urgency of the matter and are working diligently to resolve it. Our team of experts is currently investigating the issue you have raised and formulating the best course of action to provide an appropriate solution.</p>
        <p style="line-height: 140%;">Rest assured that we are treating your request with the utmost priority, and we will spare no effort to ensure that it is resolved to your satisfaction. We understand that encountering difficulties can be frustrating, and we genuinely apologize for any inconvenience caused.</p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;">Once we have successfully addressed the issue, we will provide you with a comprehensive response and any necessary instructions or updates. We aim to resolve your concern as quickly as possible, and we appreciate your patience during this process.</p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;">If you have any additional information or details that could assist us in better understanding your situation, please do not hesitate to let us know. Our team is here to assist you, and your input is invaluable in helping us provide you with the best possible support.</p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;">Thank you once again for bringing this matter to our attention. We sincerely appreciate your trust in our organization, and we assure you that we will do everything within our power to resolve the issue promptly. Should you have any further questions or concerns, please don't hesitate to reach out to us.</p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;">Best regards,</p>
        <p style="line-height: 140%;">Town of book<br /></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        
        
        
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #141727;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="background-color: #141727;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
          
        <table id="u_content_social_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
                
        <div align="center">
          <div style="display: table; max-width:167px;">
          <!--[if (mso)|(IE)]><table width="167" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:167px;"><tr><![endif]-->
          
            
            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <a href="" title="Facebook" target="_blank">
                  <img src="https://raw.githubusercontent.com/SurajjBhardwaj/twn/master/public/emailImages/image-2.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                </a>
              </td></tr>
            </tbody></table>
            <!--[if (mso)|(IE)]></td><![endif]-->
            
            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <a href="" title="Twitter" target="_blank">
                  <img src="https://raw.githubusercontent.com/SurajjBhardwaj/twn/master/public/emailImages/image-1.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                </a>
              </td></tr>
            </tbody></table>
            <!--[if (mso)|(IE)]></td><![endif]-->
            
            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <a href="" title="LinkedIn" target="_blank">
                  <img src="https://raw.githubusercontent.com/SurajjBhardwaj/twn/master/public/emailImages/image-4.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                </a>
              </td></tr>
            </tbody></table>
            <!--[if (mso)|(IE)]></td><![endif]-->
            
            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <a href="" title="Instagram" target="_blank">
                  <img src="https://raw.githubusercontent.com/SurajjBhardwaj/twn/master/public/emailImages/image-3.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                </a>
              </td></tr>
            </tbody></table>
            <!--[if (mso)|(IE)]></td><![endif]-->
            
            
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table id="u_content_text_deprecated_5" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 30px;font-family:'Open Sans',sans-serif;" align="left">
                
          <div class="v-font-size" style="line-height: 170%; text-align: center; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 170%;">UNSUBSCRIBE   |   PRIVACY POLICY   |   WEB</p>
        <p style="font-size: 14px; line-height: 170%;"> </p>
        <p style="font-size: 14px; line-height: 170%;">Town of book </p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
                
          <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <span>&#160;</span>
                </td>
              </tr>
            </tbody>
          </table>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        
        
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
          </tbody>
          </table>
          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>
        
        </html>
        
        `
         ,
      };
    
  
      transporter.sendMail(mailOption, function (error, info) {
        if (error) console.log(error);
        else {
          console.log("user recieved email ", info.response);
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




  module.exports = {
    contactMail,
    sendVerifyMail,
    recieveMail
  }