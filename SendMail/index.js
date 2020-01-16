const nodemailer = require('nodemailer');

module.exports = {
    SendMail: async(fromMail,toMail,subject,body,bodyhtml) =>{
        //mail
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'vannguyenfit@gmail.com',
            pass: 'Chinh@12341234'
            }
        });
        
        var mailOptions = {
            from: fromMail,
            to: toMail,
            subject: subject,
            text: body,
            html: bodyhtml
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}