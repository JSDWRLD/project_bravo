const express = require('express');
const userRoute = express.Router();
const AsyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../tokenGenerate');
const { protect, isAdmin } = require('../middleware/Auth');

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
                    token: generateToken(user._id),
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
);

// Get All Users - Admin Only
userRoute.get(
    '/admin/users',
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    })
);

// Get User by ID - Admin Only
userRoute.get(
    '/admin/user/:id',
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    })
);

// Update User by ID - Admin Only
userRoute.put(
    '/admin/user/:id',
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                createdAt: updatedUser.createdAt,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    })
);

// Delete User by ID - Admin Only
userRoute.delete(
    '/admin/user/:id',
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.status(200).json({ message: "User removed successfully" });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    })
);

// Add User Route - Admin Only
userRoute.post(
    '/admin/add',
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const { name, email, password, isAdmin } = req.body;
        const existUser = await User.findOne({ email });

        if (existUser) {
            res.status(400);
            throw new Error("This User Account already exists. Try a different email.");
        } else {
            const user = await User.create({ name, email, password, isAdmin });

            if (user) {
                res.status(201).json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt,
                });
            } else {
                res.status(400);
                throw new Error("Invalid User Data");
            }
        }
    })
);

module.exports = userRoute;
