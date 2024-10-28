const express = require('express');
const userRoute = express.Router();
const AsyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../tokenGenerate');
const protect = require('../middleware/Auth');

// Post methods 
// Login Route
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
                token: generateToken(user._id),
                createdAt: user.createdAt
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    })
);

// Register Route
userRoute.post('/', 
    AsyncHandler(async(req, res) => {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        console.log(`Checking for existing user with email: ${email}`);
        if (existUser) {
            res.status(400);
            throw new Error("This User Account already exist, try a different email.");
        } else {
            const user = await User.create({
                name, 
                email,
                password
            })
            
            // If user is created
            if (user) {
                res.status(201).json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt
                });
            } else {
                // Error while creating user
                res.status(400);
                throw new Error("Invalid User Data. Please enter a valid name, email, and password");
            }
        }
    })
);

// Get Method - Authorized Profile Data, user must be authorized
userRoute.get(
    '/profile', 
    protect,
    AsyncHandler(async(req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt
            });
        } else {
            res.statusCode(404);
            throw new Error("USER NOT FOUND")
        }
    })
)

// Put Method - Update User Profile Data
userRoute.put(
    '/profile',
    protect,
    AsyncHandler(async(req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                createdAt: updatedUser.createdAt,
                token: generateToken(updatedUser._id)
            });
        } else {
            res.status(404);
            throw new Error("USER NOT FOUND")
        }
    })
)

module.exports = userRoute;