const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../untils/sendEmail');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/authMiddleware');
const { sendOtp, resetPassword } = require('../controllers/auth.controller');

router.post('/send-otp', sendOtp);
router.post('/reset-password', resetPassword);
router.post('/register', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (await User.findOne({ email })) return res.status(400).json({ message: "Email already exists" });

        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        await sendEmail(email, "Your Login Password", `Welcome ${name}! Your temporary password is: ${tempPassword}`);

        res.status(201).json({ message: "Registration successful! Check terminal for email link." });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password!" });

        const token = jwt.sign({ id: user._id }, "mysecretkey", { expiresIn: "1d" });

        res.status(200).json({ 
            message: "Login successful!", 
            token, 
            isTempPassword: user.isTempPassword
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.post('/change-password', async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong old password!" });

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        user.isTempPassword = false;
        await user.save();

        res.status(200).json({ message: "Password changed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ message: "Welcome to your profile!", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});