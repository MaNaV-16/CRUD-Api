const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const nodemailer = require('nodemailer');

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
        user.otp = otp; 
        await user.save();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'franco.graham@ethereal.email',
                pass: 'jxEYjXrVvETEnkQ6cG' 
            }
        });

        await transporter.sendMail({
            from: '"CRUD API" <admin@crud.com>',
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}`
        });

        res.status(200).json({ message: "OTP sent successfully to your email!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending OTP", error });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP or Email!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.otp = null; 
        await user.save();

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error resetting password", error });
    }
};

module.exports = {
    sendOtp,
    resetPassword
};