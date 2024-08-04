const nodemailer = require('nodemailer')
const sendMail = async(data)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aashisrijal252@gmail.com',
            pass: 'igxygsohyqgziafq'
        }
    })
    const mailOption ={
        from: "NodeBlogProject",
        to: data.email,
        subject: data.subject,
        text : data.text
    }
    await transporter.sendMail(mailOption)
}
module.exports = sendMail