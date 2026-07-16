const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'henry.ratke@ethereal.email', 
            pass: 'cf5PJ6654W5PgFUKRK'
        }
    });

    const info = await transporter.sendMail({ from: '"Test Admin" <admin@test.com>', to, subject, text });
    console.log("Email Preview URL: %s", nodemailer.getTestMessageUrl(info)); 
};

module.exports = sendEmail;