const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "Access Denied! No token provided." });

    try {
        const token = authHeader.split(" ")[1];
        const verified = jwt.verify(token, "mysecretkey");
        
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token!" });
    }
};

module.exports = verifyToken;