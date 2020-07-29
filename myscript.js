var express = require('express');
var path = require('path');
var app = express();
var app2=express();
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var multer = require('multer')
var upload = multer({dest: 'uploads/'}).single('filename');
var smtpTransport = require('nodemailer-smtp-transport');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json())

app2.use(bodyParser.urlencoded({ extended: false })); 
app2.use(bodyParser.json())

app.set('port', 3000);
app2.set('port',8080);

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

app2.use(express.static(path.join(__dirname, 'public')));

var server2 = app2.listen(app2.get('port'), function() {
  var port = server2.address().port;
  console.log('Magic happens on port ' + port);
});

var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'modern.custcare@gmail.com',
    pass: 'qnfxvhalsyfsttmo'
  }
}));

 app2.post('/send-email_career', function(req, res) {
  console.log("Post Path beginning")
  upload(req,res,function(err){
      if(err){
        console.log(err)
        return res.end("Something went wrong")
      }
      else{
        var mailOptions = { 
          from: '"Modern" <modern.custcare@gmail.com>', // sender address
          to: "modern.custcare@gmail.com", // list of receivers
          subject: 'Resume', // Subject line
          text: `Name: ${req.body.firstname} ${req.body.lastname}
          Email: ${req.body.email}
          Phone: ${req.body.phone}`,
          attachments: [{
            filename:req.file.originalname,
            path: req.file.path,
        }]
      };
      console.log(req.body.firstname);
          smtpTransport.sendMail(mailOptions, function(error, info) {
           if (error) {
            console.log(error);
           }
          console.log('Message sent: ' + info.response);
          console.log("Alert works succesfully")
       });
      }
      res.append("success")
  })
});

app.post('/send-email', function(req, res) {
  console.log("contact path beginning")
    var mailOptions = { 
        from: '"Modern" <modern.custcare@gmail.com>', // sender address
        to: "modern.custcare@gmail.com", // list of receivers
        subject: 'Enquiry', // Subject line
        text: `Name: ${req.body.firstname} ${req.body.lastname}
        Email: ${req.body.email}
        Phone: ${req.body.phone}
        Message: ${req.body.message}`
    };
    console.log(req.body.firstname);
        smtpTransport.sendMail(mailOptions, function(error, info) {
         if (error) {
             return console.log(error);
         }
         console.log('Message sent: ' + info.response);
     });
     res.redirect('/');
 });
