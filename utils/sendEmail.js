import nodemailer from 'nodemailer'


export const sendEmail = async(email,subject,text)=>{

     try {




      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'heidi.mclaughlin4@ethereal.email',
            pass: 'C4BEug9vQNNBNzkpD4'
        }
    });


    await transporter.sendMail({
      from: '"Fred Foo 👻" <heidi.mclaughlin4@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
     
    });


    console.log("email sent successfully!")


        // const  transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       type: 'OAuth2',
        //       user: process.env.MAIL_USERNAME,
        //       pass: process.env.MAIL_PASSWORD,
        //       clientId: process.env.OAUTH_CLIENTID,
        //       clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //       refreshToken: process.env.OAUTH_REFRESH_TOKEN
        //     }
        //   });


        // await transporter.sendMail({
        //     from:process.env.MAIL_USERNAME,
        //     to:email,
        //     subject:subject,
        //     text:text,
        // })


  
        
     } catch (error) {

        console.log(error,"email not sent!")
        
     }

}