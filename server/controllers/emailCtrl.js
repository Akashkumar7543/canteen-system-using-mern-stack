const nodemailer = require("nodemailer")
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req,res, ) => {
    let Transporter = nodemailer.createTransport ({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user: 'akashkumar838911@gmail.com',
            pass: 'acbo xqys oyxr denu'
        },
    })

    let info = await Transporter.sendMail({
        from: '"hyee" <abc@gmail.com>',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.htm,
    });
    console.log("Messgae sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

});
module.exports = sendEmail;