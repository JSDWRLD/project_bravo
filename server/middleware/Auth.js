const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async(req, res, next) => {
    let token;
    // Example: [Bearer hashedToken]
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Get token from header if user is bearer
        try {
            // Token is at index 1, bearer is at index 0
            token = req.headers.authorization.split(" ")[1];

            // JWT Contains the data inside, so we have to decode to access user data
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            req.user = await User.findById(decodedToken.id).select("-password") // Ignore password
            next();
        } catch(err) {
            console.log(err);
        }
    }

    // If user doesn't have the token to access user data, exit
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized!")
    }
});

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed to the next middleware/route handler
    } else {
        res.status(403); // Forbidden
        throw new Error("Not authorized as an admin");
    }
};

module.exports = {protect, isAdmin};