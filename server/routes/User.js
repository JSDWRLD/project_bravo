const express = require('express');
const userRoute = express.Router();
const AsyncHandler = require('express-async-handler');
const User = require('../models/User');

// Post methods to send credenitials
userRoute.post(
    '/login', 
    AsyncHandler(async (req, res) => {
        const { email, password } = req.body;
        // Search for user credentials from user DB, MongoDB function findOne
        const user = await User.findOne({ email });
        if (user && await user.matchPassword(password)) {
            // What we retain from json if user found
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: null,
                createdAt: user.createdAt
            })
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    })
);

module.exports = userRoute;