require("dotenv").config();
const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: process.env.SERVICENAME,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
});

const mail = (recipientMail, hashCode, participantName) => {
    console.log("Sending Mail from mailer...");
    const options = {
        from: process.env.MAIL,
        to: recipientMail,
        subject: 'Participation Confirmtion - Math Olympiad',
        text: `Thank you ${participantName} for registering for our Math Olympiad Contest. Below is the code that you will use.\n${hashCode}`
    }
    
    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err);
            return 0;
        }
        console.log("Email Sent:" + info.response);
        return 1;
    });
    return 0;
}

module.exports = mail;