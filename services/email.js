const nodemailer = require("nodemailer");

const sendEmail = (to, subject, message) =>{

    const transporter = nodemailer.createTransport({
        service:"hotmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    const options = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: message
    }
    transporter.sendMail(options,(err, info)=>{
        if(err){
            return false
        }
        console.log("sent : ",info.response)
        return true
    })
}

module.exports = sendEmail;